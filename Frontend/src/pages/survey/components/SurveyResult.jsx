// This component is the to display the result of corresponding question on the survey page
import React from 'react';
import { BiCalendar } from "react-icons/bi";
import { FaQuoteRight } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa6";

export default function SurveyResult({ year, question, result }) {

    return (
        <div className="flex flex-col justify-center gap-8 ">
            <div className="flex flex-row gap-8 text-3xl text-[#152063]"><BiCalendar /><p className="font-bold font-BaiJamjureeBold ">{year}</p></div>
            <FaQuoteLeft className='text-[#152063]' />
            <p className='font-bold font-BaiJamjureeBold text-2xl text-[#152063]'>{question}</p>
            <FaQuoteRight className="ml-auto text-[#152063]" />
        </div>
    );
}