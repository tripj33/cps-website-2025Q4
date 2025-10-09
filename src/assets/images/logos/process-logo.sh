#!/usr/bin/env bash
set -euo pipefail

INPUT="sherman-williams-logo.png"
OUTPUT="sherman-williams-logo.webp"

# Background removal sensitivity
SIMILARITY=0.18   # increase if white background remains
BLEND=0.03

# Step 1: knock out near-white background
# Step 2: auto-detect crop box using cropdetect on alpha channel
# Step 3: crop, then scale to width=200 (height auto)
ffmpeg -y -hide_banner -i "$INPUT" \
  -vf "format=rgba,colorkey=0xFFFFFF:${SIMILARITY}:${BLEND},cropdetect=24:16:0,scale=200:-1" \
  -frames:v 1 -c:v libwebp -lossless 1 "$OUTPUT"

echo "✅ Wrote $OUTPUT"
