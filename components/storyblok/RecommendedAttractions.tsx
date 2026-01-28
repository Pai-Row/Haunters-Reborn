import { RecommendedAttraction } from "@/components/storyblok/RecommendedAttraction";

export const RecommendedAttractions = (params: any) => {
    return (
        <section className="py-16 container mx-auto w-full px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center">{params.blok.headline}</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-16">
                    {params.blok.attractions.map((attraction: any) => (
                        <RecommendedAttraction story={attraction} key={attraction.content._uid} />
                    ))}
                </div>
        </section>
    )
}