import IncidenceRate from "./IncidenceRate"
import DiseaseCase from "./DiseaseCase"
import VaccineEfficacy from "./VaccineEfficacy"
import AdverseReaction from "./AdverseReaction"
import OutbreaksTimeline from "./OutbreaksTimeline"
import VaxCoverage from "./VaxCoverage"
import VaxMap from "./VaxMap"
import VaxMilestone from "./VaxMilestone"

export default function Dashboard() {
    return (
        <div className="h-auto flex flex-col gap-4">
            {/* First row */}
            <div className="flex gap-4">
                <div className="flex-1 overflow-hidden">
                    <VaccineEfficacy />
                </div>
                <div>
                    <AdverseReaction />
                </div>
                <div className="flex-1 overflow-hidden">
                    <VaxMap />
                </div>
            </div>

            {/* Second row */}
            <div className="flex gap-4 h-[400px]">
                <div className="flex-1 overflow-hidden">
                    <IncidenceRate />
                </div>
                <div className="flex-1 overflow-hidden">
                    <DiseaseCase />
                </div>
                <div className="flex-1">
                    <VaxCoverage />
                </div>
            </div>

            {/* Third row */}
            <div className="flex gap-4 h-[500px]">
                <div className="flex-1 overflow-hidden">
                    <OutbreaksTimeline />
                </div>
                <div className="flex-1">
                    <VaxMilestone />
                </div>
            </div>
        </div>
    );
}