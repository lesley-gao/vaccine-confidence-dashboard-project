// This component is the sticker that displays the result of a survey question
// It displays the year, question and the percentage of people who agree with the question

import { BsPinAngleFill } from "react-icons/bs";
import { motion } from "framer-motion";

export default function ResultSticker({ year, question, result }) {
    return (
        <motion.div
            className="box"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}>

            <div className="relative flex justify-center items-center text-md md:text-xl bg-yellow-100 p-8 shadow-md shadow-slate-500">

                <BsPinAngleFill className="absolute top-[-20px] text-[#3949AB] h-[50px] w-[50px]" />

                <div className="flex flex-col justify-center gap-8">
                    <p className=" font-bold">{year}</p>
                    <p>{question}</p>
                    <p className=" font-bold">Agree: {result}</p>
                </div>
            </div>

        </motion.div>
    )
}