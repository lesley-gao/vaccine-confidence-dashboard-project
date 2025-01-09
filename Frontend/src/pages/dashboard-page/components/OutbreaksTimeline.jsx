// This is the compoment that displays the timeline of past measles outbreaks in New Zealand.
// The component will be used in DashboardPage.
import { diseaseOutbreaks } from "@/utils/outbreaks";

export default function OutbreaksTimeline() {

    return (
        <div className="h-full flex flex-col bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)]">
            {/* Header */}
            <h1 className="p-4 text-xl font-bold font-PoppinsBold">Past Outbreaks</h1>

            {/* Scrollable Content */}
            <div
                className="flex-1 overflow-y-auto p-4 pt-0"
                style={{
                    scrollbarWidth: "thin", 
                    scrollbarColor: "gray transparent",
                }}
            >
                {diseaseOutbreaks.map((outbreak) => (
                    <div className="flex gap-3 mb-3" key={outbreak.dpoYear}>
                        <div className="w-8 aspect-square flex-shrink-0">
                            <img
                                src="/virus.jpg"
                                alt="virus illustration"
                                className="rounded-full"
                            />
                        </div>
                        <div>
                            <h6 className="text-lg font-bold">{outbreak.dpoYear}</h6>
                            <p className="text-gray-600">{outbreak.dpoDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}