//This component is the to display the result of corresponding question on the survey page
import React from 'react';
import { BiCalendar } from "react-icons/bi";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";

export default function SurveyResult({ year, question }) {
    return (
        <div className="flex flex-col gap-6 p-4 rounded-lg transition-all duration-300">
            <div className="flex items-center gap-3">
                <BiCalendar className="text-2xl text-indigo-900" />
                <p className="text-2xl font-bold text-indigo-900">{year}</p>
            </div>

            <div className="relative pl-4">
                <FaQuoteLeft className="absolute top-0 left-0 text-indigo-900 opacity-50" />
                <p className="text-xl font-bold text-indigo-900 px-6 py-2">
                    {question}
                </p>
                <FaQuoteRight className="absolute bottom-0 right-0 text-indigo-900 opacity-50" />
            </div>
        </div>
    );
}