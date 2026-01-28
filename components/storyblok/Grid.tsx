import { StoryblokServerComponent } from "@storyblok/react/rsc";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export const Grid = (props: any) => {
  const { blok } = props;

  // ✅ Use carousel only for testimonials grid
  if (blok.variant === "testimonials") {
    return (
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto w-full px-4">
          <h2 className="text-3xl md:text-4xl font-bold">{blok.headline}</h2>

          <div className="mt-12">
            <TestimonialCarousel>
              {blok.items.map((item: any) => (
                <StoryblokServerComponent blok={item} key={item._uid} />
              ))}
            </TestimonialCarousel>
          </div>
        </div>
      </section>
    );
  }

  // existing grid behaviour (Scares for all ages etc.)
  return (
    <section className="py-16">
      <div className="container mx-auto w-full px-4">
        <h2 className="text-3xl md:text-4xl font-bold">{blok.headline}</h2>
        <div className="grid md:grid-flow-col auto-cols-fr mt-12 gap-8">
          {blok.items.map((item: any) => (
            <StoryblokServerComponent blok={item} key={item._uid} />
          ))}
        </div>
      </div>
    </section>
  );
};
