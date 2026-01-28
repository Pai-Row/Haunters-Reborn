import { RecommendedAttraction } from "@/components/storyblok/RecommendedAttraction";
import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";

const fetchAttractionsPage = async () => {
  const client = getStoryblokApi();
  const response = await client.getStory(`attractions`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return response.data.story;
};

const fetchAllAttractions = async () => {
    const client = getStoryblokApi();
    const response = await client.getStories({
        content_type: "attractions",
        version: process.env.NODE_ENV === "development" ? "draft" : "published",
    })
    return response.data.stories
}

const AttractionsPage = async () => {
  const story = await fetchAttractionsPage();
  const attractions = await fetchAllAttractions();

return (
        <div>
            <StoryblokStory story={story} />
                <div className="container mx-auto px-4 w-full py-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {attractions.map((a) => (
                    <RecommendedAttraction story={a} key={a.uuid} />
                ))}
        </div>
    </div>
)

}

export default AttractionsPage;