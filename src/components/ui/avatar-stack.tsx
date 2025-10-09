"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface AvatarStackProps {
  avatars: { src: string; alt: string }[];
}

export default function AvatarStack({ avatars }: AvatarStackProps) {
  return (
    <div className="-space-x-4 flex">
      {avatars.map((a, i) => (
        <Avatar
          key={i}
          className="size-14 border-2 border-background shadow-sm ring-1 ring-border"
        >
          <AvatarImage src={a.src} alt={a.alt} />
        </Avatar>
      ))}
    </div>
  );
}
