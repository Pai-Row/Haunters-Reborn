import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";

export const dynamic = "force-dynamic"; // ✅ important for draftMode in prod

const fetchHomePage = async () => {
  const { isEnabled } = await draftMode(); // ✅ Next 16
  const client = getStoryblokApi();

  const response = await client.getStory("home", {
    version: process.env.NODE_ENV === "development" || isEnabled ? "draft" : "published",
    resolve_relations: "recommended_attractions.attractions",
  });

  return response.data.story;
};

export default async function HomePage() {
  const story = await fetchHomePage();
  return <StoryblokStory story={story} />;
}
