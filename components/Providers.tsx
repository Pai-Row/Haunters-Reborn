"use client";

import type { PropsWithChildren } from "react";
import { StoryblokProvider } from "@/components/Storyblokprovider";

export default function Providers({ children }: PropsWithChildren) {
  return <StoryblokProvider>{children}</StoryblokProvider>;
}
