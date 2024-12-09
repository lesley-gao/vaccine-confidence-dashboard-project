// This is the compoment that displays the timeline of past measles outbreaks in New Zealand.
// The component will be used in DashboardPage.

export default function OutbreaksTimeline() {
    const outbreaks = [
        { year: "2019", desciption: "Largest recent outbreak with over 2,000 cases, primarily in Auckland. Samoa was also severely affected due to travel connections with New Zealand." },
        { year: "2014", desciption: "Major outbreak centered in Hamilton and the Waikato region with 280 cases." },
        { year: "2011", desciption: "Series of outbreaks resulting in over 600 cases, with Auckland being particularly affected." },
        { year: "2009", desciption: "A significant outbreak began in Christchurch, eventually spreading to other regions with 400+ cases reported." },
        { year: "1997", desciption: "Large outbreak with over 2,000 reported cases, primarily affecting school-aged children." },
        { year: "1991", desciption: "A major measles epidemic occurred with over 7,000 cases reported and 7 deaths." },
    ];

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
                {outbreaks.map((outbreak) => (
                    <div className="flex gap-3 mb-3" key={outbreak.year}>
                        <div className="w-8 aspect-square flex-shrink-0">
                            <img
                                src="/virus.jpg"
                                alt="virus illustration"
                                className="rounded-full"
                            />
                        </div>
                        <div>
                            <h6 className="text-lg font-bold">{outbreak.year}</h6>
                            <p className="text-gray-600">{outbreak.desciption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}