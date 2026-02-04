import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export const Page = (params: any) => {
    return (
        <main {...storyblokEditable(params.blok)}>
            {params.blok.blocks.map((blok: any) => (
                <StoryblokServerComponent blok={blok} key={blok._uid} />
            ))}
        </main>
    )
};