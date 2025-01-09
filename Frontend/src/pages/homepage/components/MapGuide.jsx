import InteractiveHoverButton from "@/components/ui/interactive-hover-button";


export default function MapGuide() {
    return (
        <div className="relative flex items-center justify-center m-auto mt-10 mb-20">
            <div className="relative w-3/4 rounded-3xl overflow-hidden shadow-lg">
                <img
                    className="object-cover"
                    src="src/assets/MapBG.png"
                    alt="MapBG"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                    <div className="font-BaiJamjureeBold text-[#152063] text-[35px] text-center">
                        Want to know where to get vaccinated?
                    </div>
                    <InteractiveHoverButton href="/map" text="See More"className="w-[180px]"/>
                </div>
            </div>
        </div>
    );
}
