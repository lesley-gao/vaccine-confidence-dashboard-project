/**
 * This component displays the mission of the application.
 * It is used on the homepage.
 */
import { IoBarChart } from "react-icons/io5";
import { RiPieChartFill } from "react-icons/ri";
import { RiBarChartBoxFill } from "react-icons/ri";

export default function OurMission() {
    return (
        <div className="flex flex-col items-center mb-20 gap-14">
            <div className="flex flex-row gap-16 max-sm:flex-col max-sm:px-8 max-sm:gap-10">

                <div className="flex flex-col w-1/3 gap-5 max-sm:w-full">
                    <div className="flex items-center justify-center w-[50px] h-[50px] bg-white/20 border border-white rounded-full p-2 dark:border-cyan-300">
                        <RiBarChartBoxFill className="w-[40px] h-[40px] fill-[#3949AB] dark:fill-cyan-300" />
                    </div>
                    <div>
                        <div className="text-[25px] font-bold text-[#152063] dark:text-cyan-300">Intutive</div>
                        <div className="text-justify dark:text-gray-300">We are committed to providing you with professional vaccine reliability information through clear data visualization dashboards to promote correct information.</div>
                    </div>
                </div>

                <div className="flex flex-col w-1/3 gap-5 max-sm:w-full">
                    <div className="flex items-center justify-center w-[50px] h-[50px] bg-white/20 border border-white rounded-full p-2 dark:border-cyan-300">
                        <RiPieChartFill className="w-[40px] h-[40px] fill-[#3949AB] dark:fill-cyan-300" />
                    </div>
                    <div>
                        <div className="text-[25px] font-bold text-[#152063] dark:text-cyan-300">Insightful</div>
                        <div className="text-justify dark:text-gray-300">We hope that decision makers, academic researchers and other relevant professionals can gain insights here.</div>
                    </div>
                </div>

                <div className="flex flex-col w-1/3 gap-5 max-sm:w-full">
                    <div className="flex items-center justify-center w-[50px] h-[50px] bg-white/20 border border-white rounded-full p-2 dark:border-cyan-300">
                        <IoBarChart className="w-[40px] h-[40px] fill-[#3949AB] dark:fill-cyan-300" />
                    </div>
                    <div>
                        <div className="text-[25px] font-bold text-[#152063] dark:text-cyan-300">Practical</div>
                        <div className="text-justify dark:text-gray-300">We hope that the public can get more information they need about vaccines that are closely related to our personal health.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}