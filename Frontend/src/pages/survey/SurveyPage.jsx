import SurveyCircle from "@/pages/survey/components/SurveyCircle"
import ConfidencePct from "@/pages/survey/components/ConfidencePct"
import ResultSticker from "@/pages/survey/components/ResultSticker"
import SurveyChart from "@/pages/survey/components/SurveyChart"
import SurveyResult from "./components/SurveyResult"
import { useState, useEffect } from "react";
import { data, demographicData } from "@/utils/surveyData"

export default function SurveyPage() {

    const [selectedYear, setSelectedYear] = useState(2023);
    const [selectedQuestion, setSelectedQuestion] = useState("Vaccines are important for children.");
    const [result, setResult] = useState(80);
    const [selectedDemoType, setSelectedDemoType] = useState("Age");
    const [demoResults, setDemoResults] = useState([]);  

    useEffect(() => {
        const selectedData = data.find(item =>
            item.surveyYear === Number(selectedYear) &&
            item.surveyQuestion === selectedQuestion
        );

        if (selectedData) {
            setResult(selectedData.agree_percent);
        }
    }, [selectedYear, selectedQuestion]); // update the result when the year or question changes

    
     // get the demographic options for the selected year and demographic type
     const getDemographicOptions = (year, demoType) => {
        if (!demographicData[year]) return [];
        
        // Get all the options for the selected demographic type by iterating over all the questions for the selected year
        // and adding the options to a Set to ensure uniqueness, and then converting the Set to an array
        // This is done to ensure that all options are included even if there is no data for them
        const allOptions = new Set();
        Object.values(demographicData[year]).forEach(questionData => {
            if (questionData[demoType]) {
                Object.keys(questionData[demoType]).forEach(option => {
                    allOptions.add(option);
                });
            }
        });
        
        return Array.from(allOptions);
    };


    useEffect(() => {
        // get the demographic data for the selected year, question and demographic type
        const getDemographicData = () => {

            try {
                const yearData = demographicData[selectedYear];
                if (!yearData) return [];

                const questionData = yearData[selectedQuestion];
                if (!questionData) return [];

                const demoTypeData = questionData[selectedDemoType];
                if (!demoTypeData) return [];

                // get the demographic options for the selected year and demographic type
                const currentOptions = getDemographicOptions(selectedYear, selectedDemoType);
                 
                // Convert the data to ensure that all options are included, and show 0 if there is no data
                const result = currentOptions.map(option => ({
                    category: option,
                    agree_percent: demoTypeData[option] || 0
                }));

                return result;
            } catch (error) {
                console.error('Error getting demographic data:', error);
                return [];
            }
        };

        const demoData = getDemographicData();
        setDemoResults(demoData);

    }, [selectedYear, selectedQuestion, selectedDemoType]);

    const handleYearSelection = (option) => {
        console.log('Selected year:', option);
        setSelectedYear(option);
    };

    const handleQuestionSelection = (option) => {
        console.log('Selected question:', option);
        setSelectedQuestion(option);
    };

    const handleDemoTypeSelection = (option) => {
        console.log('Selected demographic:', option);
        setSelectedDemoType(option);
    };

    return (
        <div className="relative min-h-0 ">
            {/* Background image */}
            <div className="absolute inset-0 bg-[url('nz_map.jpg')] bg-contain bg-no-repeat bg-center opacity-10 z-0">
            </div>

            <div className=" bg-gray-50 border-2 border-white bg-opacity-60 rounded-xl">
                <p className="font-bold text-2xl p-5">New Zealand</p>
                <p className="mb-6 p-5">Confidence in vaccines in New Zealand has increased since the first surveys carried out there. In 2018, 69% of people felt that vaccines were safe while 79% thought they were effective. 84% said they believed it was important for children to have vaccines.</p>
                <div className="relative z-10 flex">
                    {/* left side */}
                    <div className="flex flex-col w-2/5 ">
                        <div className="flex justify-start pl-[10%] mb-5">
                            <SurveyCircle size={200} optionType={"Year"} position={"left"} onChange={handleYearSelection} data={data} />
                        </div>
                        <div className="flex justify-end pr-[5%] mb-5">
                            <SurveyCircle size={280} optionType={"Question"} position={"right"} onChange={handleQuestionSelection} data={data} />
                        </div>
                        <div className="flex justify-start pl-[10%]">
                            <SurveyCircle size={250} optionType={"Demographic"} position={"left"} onChange={handleDemoTypeSelection} data={["Age", "Education", "Gender", "Religion"]}  />
                        </div>
                    </div>

                    {/* right side */}
                    <div className="flex flex-col w-3/5 gap-[10%] p-10 ">
                        {/* Conclusion section */}
                        <div className="flex flex-row justify-evenly gap-8 ">

                            <SurveyResult year={selectedYear} question={selectedQuestion} result={result} />
                            <p className=" font-bold text-3xl font-BaiJamjureeBold text-[#152063]">Agree:  </p>
                            <ConfidencePct percentage={result} size={200} />
                        </div>

                        {/* Diagram display section */}
                        <div className="w-full h-[400px]">
                            {/* <SurveyChart /> */}
                            <SurveyChart data={demoResults} selectedDemoType={selectedDemoType} year={selectedYear} question={selectedQuestion}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}