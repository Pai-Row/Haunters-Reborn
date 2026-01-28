import { StoryblokServerRichText } from "@storyblok/react/rsc";

export default function Attractions({ blok }: any) {
  return (
    <main className="container mx-auto px-4 w-full pt-32 pb-16">
      {blok?.name && <h1 className="text-3xl md:text-5xl font-bold">{blok.name}</h1>}

      {blok?.main_image?.filename && (
        <img
          src={blok.main_image.filename}
          alt={blok?.main_image?.alt ?? blok?.name ?? "Attraction image"}
          className="mt-12"
        />
      )}
      
      {blok?.introduction && (
        <p className="mt-12 text-lg md:text-2xl md:leading-relaxed">{blok.introduction}</p>
      )}


      {/* ✅ body is Rich Text */}
      {blok?.body?.type === "doc" && (
        <section className="prose prose-invert md:prose-lg mt-16 max-w-none">
          <StoryblokServerRichText doc={blok.body} />
        </section>
      )}
    </main>
  );
}
