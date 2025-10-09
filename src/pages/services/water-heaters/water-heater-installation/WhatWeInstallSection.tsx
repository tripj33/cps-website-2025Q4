"use client";

import * as React from "react";

/** -------------------------------------------------------
 * Types
 * ----------------------------------------------------- */
export interface ImageMeta {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export interface InstallPoint {
  id: string;
  title: string;
  description: string;
}

export interface WhatWeInstallProps {
  /** Your spacing utility: "pad-sm" | "pad-md" | "pad-lg" */
  padClass?: string;
  className?: string;

  /** Headline & optional blurb */
  heading?: string;
  blurb?: string;

  /** Up to 6 points about models/sizes/fuel/warranty */
  points: InstallPoint[];

  /** The 3 overlapping images (all frontmatter controlled) */
  images: {
    left: ImageMeta;    // back layer, rotated -12deg in original
    middle: ImageMeta;  // front layer (raised)
    right: ImageMeta;   // front layer (rotated +12deg)
  };
}

/** -------------------------------------------------------
 * Component
 * ----------------------------------------------------- */
export default function WhatWeInstallSection({
  padClass,
  className,
  heading = "What We Install",
  blurb,
  points,
  images,
}: WhatWeInstallProps) {
  // Safety: cap at 6 bullets
  const list = points.slice(0, 6);

  return (
    <section className={`${padClass ?? ""} ${className ?? ""}`}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Overlapping images */}
          <div className="relative mb-8 lg:mb-0">
            {/* Middle (front-center) */}
            <div className="relative -top-12 z-10 mx-auto w-[50%] sm:w-[35%]">
              <img
                alt={images.middle.alt}
                src={images.middle.src}
                width={images.middle.width}
                height={images.middle.height}
                className={`h-[200px] rounded-lg object-cover shadow-lg sm:h-[300px] ${images.middle.className ?? ""}`}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Left (back) */}
            <div className="absolute top-8 left-0 z-0 w-[50%] -rotate-12 sm:w-[35%]">
              <img
                alt={images.left.alt}
                src={images.left.src}
                width={images.left.width}
                height={images.left.height}
                className={`h-[200px] rounded-lg object-cover shadow-lg sm:h-[300px] ${images.left.className ?? ""}`}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Right (front) */}
            <div className="absolute top-8 right-0 z-20 w-[50%] rotate-12 sm:w-[35%]">
              <img
                alt={images.right.alt}
                src={images.right.src}
                width={images.right.width}
                height={images.right.height}
                className={`h-[200px] rounded-lg object-cover shadow-lg sm:h-[300px] ${images.right.className ?? ""}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="max-w-xl max-lg:mx-auto lg:ml-auto">
            <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:max-w-[80%]">
              {heading}
            </h2>

            {blurb && (
              <p className="mt-3 text-muted-foreground sm:text-base">
                {blurb}
              </p>
            )}

            <div className="mt-6 grid gap-6 sm:mt-10 sm:gap-8">
              {list.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Button removed per your request */}
          </div>
        </div>
      </div>
    </section>
  );
}
