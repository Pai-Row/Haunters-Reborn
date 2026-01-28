import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Attractions from "@/components/storyblok/Attractions";
import { Page } from "@/components/storyblok/Page";
import { Hero } from "@/components/storyblok/Hero";
import { Grid } from "@/components/storyblok/Grid";
import { Feature } from "@/components/storyblok/Feature";
import { Testimonial } from "@/components/storyblok/Testimonial";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { RecommendedAttractions } from "@/components/storyblok/RecommendedAttractions";

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    attractions: Attractions,
    page: Page,
    hero: Hero,
    grid: Grid,
    feature: Feature,
    testimonial: Testimonial,
    testimonials_section: TestimonialCarousel,
    recommended_attractions: RecommendedAttractions,
    // add more here once we discover them
  },
  enableFallbackComponent: true,
  customFallbackComponent: ({ blok }: any) => {
    return (
      <div style={{ padding: 12, border: "1px solid #f00", margin: "12px 0" }}>
        Missing React component for Storyblok blok: <strong>{blok?.component}</strong>
      </div>
    );
  },
});
