/**
 * This component displays a confidence percentage with a circular progress bar.
 * It is used on the Survey page.
 */
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

export default function ConfidencePct({ percentage, size }) {
    // Add state for animated percentage
    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    // Calculate the circumference and stroke-dasharray
    const radius = size * 0.4;  // 40% of size to fit nicely in container
    const circumference = 2 * Math.PI * radius;
    const strokeWidth = size * 0.08;  // 8% of size for stroke width
    const progress = ((100 - animatedPercentage) / 100) * circumference;  // Calculate progress based on animated percentage

    // Animation effect: reset animation when percentage changes, then animate to target percentage
    useEffect(() => {
        setAnimatedPercentage(0);

        const timer = setTimeout(() => {
            setAnimatedPercentage(percentage);
        }, 100);

        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <motion.div
            className="box"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >

            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90" >
                    <defs>
                        <linearGradient id="progressGradient" gradientTransform="rotate(90)">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="50%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="#2dd4bf" />
                        </linearGradient>
                    </defs>

                    {/* Background circle with pulse animation */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="#3949AB"
                        strokeWidth={strokeWidth}
                        strokeOpacity="0.15"
                        className="animate-pulse"
                    />

                    {/* Progress circle with transition */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="url(#progressGradient)"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={progress}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center text-4xl font-semibold  text-[#3949AB] dark:text-slate-200" >
                    {Math.round(animatedPercentage)}%
                </div>

            </div>

        </motion.div >
    );
}
