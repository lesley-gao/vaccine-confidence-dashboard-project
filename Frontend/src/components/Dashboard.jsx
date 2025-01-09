import IncidenceRate from "../pages/dashboard-page/components/IncidenceRate"
import DiseaseCase from "../pages/dashboard-page/components/DiseaseCase"
import VaccineEfficacy from "../pages/dashboard-page/components/VaccineEfficacy"
import AdverseReaction from "../pages/dashboard-page/components/AdverseReaction"
import OutbreaksTimeline from "../pages/dashboard-page/components/OutbreaksTimeline"
import VaxCoverage from "../pages/dashboard-page/components/VaxCoverage"
import VaxMap from "../pages/dashboard-page/components/VaxMap"
import VaxMilestone from "../pages/dashboard-page/components/VaxMilestone"

export default function Dashboard() {
    return (
        <div className="h-auto flex flex-col gap-4">
            {/* First row */}
            <div className="flex gap-4">
                <div className="flex-1 overflow-hidden">
                    <VaccineEfficacy />
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
            <div className="flex gap-4 h-[500px] ">
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