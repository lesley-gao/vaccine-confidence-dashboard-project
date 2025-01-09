import IncidenceRate from "./IncidenceRate"
import DiseaseCase from "./DiseaseCase"
import VaccineEfficacy from "./VaccineEfficacy"
import AdverseReaction from "./AdverseReaction"
import OutbreaksTimeline from "./OutbreaksTimeline"
import VaxCoverage from "./VaxCoverage"
import VaxMap from "./VaxMap"
import VaxMilestone from "./VaxMilestone"
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="h-auto flex flex-col gap-4">
        {/* First row */}
        <div className="flex gap-4">
            <div className="flex-1 overflow-hidden hover:scale-[1.01]">
                <VaccineEfficacy />
            </div>
            <div className="flex-1 overflow-hidden hover:scale-[1.01]" onClick={() => navigate('/map')}>
                <VaxMap />
            </div>
        </div>

        {/* Second row */}
        <div className="flex gap-4 h-[400px]">
            <div className="flex-1 overflow-hidden hover:scale-[1.01]">
                <IncidenceRate />
            </div>
            <div className="flex-1 overflow-hidden hover:scale-[1.01]">
                <DiseaseCase />
            </div>
            <div className="flex-1 hover:scale-[1.01]">
                <VaxCoverage />
            </div>
        </div>

        {/* Third row */}
        <div className="flex gap-4 h-[500px] ">
            <div className="flex-1 overflow-hidden hover:scale-[1.01]">
                <OutbreaksTimeline />
            </div>
            <div className="flex-1 hover:scale-[1.01]">
                <VaxMilestone />
            </div>
        </div>
    </div>
    );
}