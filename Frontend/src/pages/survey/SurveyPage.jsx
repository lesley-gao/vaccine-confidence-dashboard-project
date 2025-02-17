/**
 * This page provides an interactive interface for exploring vaccine confidence survey data, 
 * including year, question, and demographic-based analysis.
 */
import SurveyCircle from "@/pages/survey/components/SurveyCircle"
import ConfidencePct from "@/pages/survey/components/ConfidencePct"
import SurveyChart from "@/pages/survey/components/SurveyChart"
import SurveyResult from "./components/SurveyResult"
import DemographicDetails from "./components/DemographicDetails"
import { useState, useEffect } from "react";
import { fetchData } from '@/utils/api.js'

export default function SurveyPage() {

    const [confidenceData, setConfidenceData] = useState([]);
    const [demoData, setDemoData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2023);
    const [selectedQuestion, setSelectedQuestion] = useState("Vaccines are important for children.");
    const [result, setResult] = useState(80);
    const [selectedDemoType, setSelectedDemoType] = useState("Age");
    const [demoResults, setDemoResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch the confidence data for New Zealand
    useEffect(() => {
        const getConfidenceData = async () => {
            setLoading(true);
            try {
                const data = await fetchData(`/vaccine/vci-survey/general/country-code?binaryCountryCode=NZ`);
                setConfidenceData(data || []);
            } catch (error) {
                console.error('Failed to fetch confidence data:', error);
            } finally {
                setLoading(false);
            }
        };
        getConfidenceData();
    }, []);

    // Fetch the demographic data for New Zealand
    useEffect(() => {
        const getDemoData = async () => {
            setLoading(true);
            try {
                const data = await fetchData(`/vaccine/vci-survey/detailed/all`);
                setDemoData(data || []);
            } catch (error) {
                console.error('Failed to fetch demographic data:', error);
                setDemoData([]);
            } finally {
                setLoading(false);
            }
        };
        getDemoData();
    }, []);

    // Get the confidence result for the selected year and question
    useEffect(() => {
        if (!confidenceData.length) return;

        const selectedData = confidenceData.find(item => item.vsgYear === Number(selectedYear));

        if (selectedData) {
            let value;
            switch (selectedQuestion) {
                case "Vaccines are important for children.":
                    value = selectedData.vsgChildren * 100;
                    break;
                case "Vaccines are safe.":
                    value = selectedData.vsgSafe * 100;
                    break;
                case "Vaccines are effective.":
                    value = selectedData.vsgEffective * 100;
                    break;
                case "Vaccines are compatible with my beliefs.":
                    value = selectedData.vsgBeliefs ? selectedData.vsgBeliefs * 100 : null;
                    break;
                default:
                    value = 0;
            }
            setResult(value);
        }
    }, [selectedYear, selectedQuestion, confidenceData]);

    // Get the demographic results for the selected year, question, and demographic type
    useEffect(() => {
        const getDemoResults = () => {
            try {
                if (!demoData || !Array.isArray(demoData)) {
                    console.log('demoData is invalid:', demoData);
                    return [];
                }

                const filteredData = demoData.filter(item =>
                    item.vsdYear === Number(selectedYear) &&
                    item.vsdDemographics === selectedDemoType
                );

                const getValue = (item) => {
                    switch (selectedQuestion) {
                        case "Vaccines are important for children.":
                            return item.vsdChildren * 100;
                        case "Vaccines are safe.":
                            return item.vsdSafe * 100;
                        case "Vaccines are effective.":
                            return item.vsdEffective * 100;
                        case "Vaccines are compatible with my beliefs.":
                            return item.vsdBeliefs ? item.vsdBeliefs * 100 : null;
                        default:
                            return 0;
                    }
                };

                // Map the filtered data to the required format
                const mappedData = filteredData.map(item => ({
                    category: item.vsdDmgType,
                    agree_percent: getValue(item)
                }));
                return mappedData;
            } catch (error) {
                console.error('Error getting demographic data:', error);
                return [];
            }
        };

        const results = getDemoResults();
        setDemoResults(results);

    }, [selectedYear, selectedQuestion, selectedDemoType, demoData]);

    const handleYearSelection = (option) => { setSelectedYear(option) };
    const handleQuestionSelection = (option) => { setSelectedQuestion(option) };
    const handleDemoTypeSelection = (option) => { setSelectedDemoType(option) };

    return (
        <div className="relative min-h-screen ">

            {/* Background image */}
            <div className="absolute inset-0 bg-[url('/image/nz_map.jpg')] bg-cover bg-no-repeat bg-center opacity-5 z-0 
            transition-opacity duration-500 hover:opacity-10 "/>

            <div className='relative'>
                <img src="/image/surveyimg.jpg" alt="survey" className="w-full mb-4 rounded-xl transition-all duration-300 shadow-md" />
                <div className="absolute top-1/2 left-10 -translate-y-1/2 font-bold">
                    <p className="text-2xl text-white uppercase mb-2 max-lg:text-lg">
                        Vaccine Confidence Survey
                    </p>
                    <p className="text-indigo-900 text-lg max-lg:text-sm max-md:hidden">
                        Explore confidence in vaccines in New Zealand
                    </p>
                </div>
            </div>

            {/* Main content area */}
            <p className="text-gray-700 p-4 mb-6 md:text-lg dark:text-white">Please select a year, question, and demographic to explore people's confidence in vaccine-related statements.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left side */}
                <div className="lg:col-span-5 space-y-6 max-md:space-y-16">
                    <div className="flex justify-start pl-[10%] mb-5 transform hover:scale-105 transition-transform duration-300">
                        <SurveyCircle size={200} optionType={"Year"} position={"left"} onChange={handleYearSelection} data={confidenceData} />
                    </div>
                    <div className="flex justify-end pr-[5%] mb-5 transform hover:scale-105 transition-transform duration-300">
                        <SurveyCircle size={280} optionType={"Question"} position={"right"} onChange={handleQuestionSelection} data={confidenceData} />
                    </div>
                    <div className="flex justify-start pl-[10%] transform hover:scale-105 transition-transform duration-300">
                        <SurveyCircle size={250} optionType={"Demographic"} position={"left"} onChange={handleDemoTypeSelection} data={["Age", "Education", "Gender", "Religion"]} />
                    </div>
                </div>

                {/* right side */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="backdrop-blur-sm component-card">
                        <div className="flex items-center justify-between gap-8 max-md:flex-col">
                            <SurveyResult year={selectedYear} question={selectedQuestion} />
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-indigo-900 dark:text-cyan-300">Agree:</span>
                                <ConfidencePct percentage={result} size={200} />
                            </div>
                        </div>
                        <p className="text-gray-600 p-5 dark:text-slate-200"> * In {selectedYear}, {result}% of New Zealanders agreed that {selectedQuestion.toLowerCase()}</p>
                    </div>

                    <div className="h-[450px] backdrop-blur-sm component-card">
                        <SurveyChart data={demoResults} selectedDemoType={selectedDemoType} year={selectedYear} question={selectedQuestion} />
                    </div>
                </div>
            </div>

            {/* Bottom section */}
            {Number(selectedYear) !== 2022 && (<div className="h-[550px] component-card mt-8 backdrop-blur-sm">
                <DemographicDetails
                    demoData={demoData}
                    question={selectedQuestion}
                    selectedDemoType={selectedDemoType}
                />
            </div>)}

            <div className="p-4 mt-8 ">
                <p className="text-gray-700 leading-relaxed dark:text-white relative z-10">
                    <span className="font-bold">Please note: </span>
                    The data on this page is collected from the <a href="https://www.vaccineconfidence.org/vci/map/" target="_blank" className="underline hover:text-cyan-300"><i>Vaccine Confidence Project™</i></a> , a global research initiative that monitors public confidence in vaccines.
                    All data is used solely for non-commercial purposes. Copyright and intellectual property rights belong to the <i>Vaccine Confidence Project™</i>.
                </p>
            </div>

        </div>
    )
}