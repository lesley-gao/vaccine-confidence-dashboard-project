// This component is the cirle on the survey page 
// It allows the user to select the year, question and demographic of the survey they want to view.
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const itemVariants = {
  open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
  closed: { opacity: 0, x: 20, transition: { duration: 0.2 } }
};

export default function SurveyCircle({ size, optionType, position, onChange, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(optionType);
  const [optionsList, setOptionsList] = useState([]);

  const radius = size * 0.4;
  const strokeWidth = size * 0.08;

  // Generate the options list based on the option type
  useEffect(() => {
    if (!data) return;

    switch (optionType) {
      case "Year":
        const years = [...new Set(data.map(item => item.vsgYear))];
        setOptionsList(years.map(year => year.toString()));
        break;

      case "Question":
        setOptionsList([
          "Vaccines are important for children.",
          "Vaccines are safe.",
          "Vaccines are effective.",
          "Vaccines are compatible with my beliefs."
        ]);
        break;

      case "Demographic":
        setOptionsList(data);
        break;

      default:
        setOptionsList([]);
    }
  }, [optionType, data]);

  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="relative">
      <motion.div
        className="box"
        animate={{ rotate: 360 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setIsOpen(!isOpen)}>

        <div className="relative transition-all cursor-pointer" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            <defs>
              <linearGradient id="circleGradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#152063" />
                <stop offset="33%" stopColor="#6674DB" />
                <stop offset="66%" stopColor="#3949AB" />
                <stop offset="100%" stopColor="#A8B4FF" />
              </linearGradient>
            </defs>
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="url(#circleGradient)" strokeWidth={strokeWidth} />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center text-lg text-center font-semibold text-[#152063]" style={{ padding: `0 ${size * 0.2}px` }}>
            {selectedValue}
          </div>
        </div>
      </motion.div>

      <motion.ul
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: { type: "spring", bounce: 0, duration: 0.4, delayChildren: 0.1, staggerChildren: 0.03 }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: { type: "spring", bounce: 0, duration: 0.2 }
          }
        }}
        className="absolute top-1/2 -translate-y-1/2 bg-white p-2 min-w-[200px] border border-[#6674DB] shadow-md z-10 text-center"
        style={{ [position]: `${size + 10}px`, pointerEvents: isOpen ? "auto" : "none" }}
      >
        {optionsList.map((option) => (
          <motion.li
            key={option}
            variants={itemVariants}
            className={`px-4 py-2 cursor-pointer transition-colors duration-200 
                       ${selectedValue === option ? 'bg-[#3949AB] text-white' : 'text-gray-600 hover:bg-[#A8B4FF]'}`}
            onClick={() => handleOptionSelect(option)}>
            {option}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}