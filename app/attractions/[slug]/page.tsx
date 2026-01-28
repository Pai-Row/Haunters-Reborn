import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const client = getStoryblokApi();
  const response = await client.getStories({
    content_type: "attraction",
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });

  return response.data.stories.map((story: any) => ({
    slug: story.slug,
  }));
}

const fetchAttractionPage = async (slug: string) => {
  const client = getStoryblokApi();
  const response = await client.getStory(`attractions/${slug}`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return response.data.story;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AttractionPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const story = await fetchAttractionPage(slug);
    return <StoryblokStory story={story} />;
  } catch (err: any) {
    // If Storyblok returns 404, show Next's 404 page
    if (err?.status === 404 || err?.response?.status === 404) return notFound();
    throw err;
  }
}
