import AdverseReaction from "@/components/dashboard/AdverseReaction";
import Dashboard from "@/components/dashboard/Dashboard";
import DiseaseCase from "@/components/dashboard/DiseaseCase";
import IncidenceRate from "@/components/dashboard/IncidenceRate";
import OutbreaksTimeline from "@/components/dashboard/OutbreaksTimeline";
import VaccineEfficacy from "@/components/dashboard/VaccineEfficacy";
import VaxCoverage from "@/components/dashboard/VaxCoverage";
import VaxMap from "@/components/dashboard/VaxMap";
import VaxMilestone from "@/components/dashboard/VaxMilestone";

export default function Map() {
    return (
        <div>
            <OutbreaksTimeline />
            <VaxMilestone />

            {/* An interesting gif*/}
            <div style={{ width: "100%", height: 0, paddingBottom: "66%", position: "relative" }}>
                <iframe
                    src="https://giphy.com/embed/sHupUawqRGO0te2OMD"
                    width="100%"
                    height="100%"
                    style={{ position: "absolute" }}
                    className="giphy-embed"
                    allowFullScreen
                ></iframe>
            </div>

        </div>
    );
}
