// This is a confidence percentage component that displays a percentage value with a circular progress bar.

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

    // Animation effect
    useEffect(() => {
        // Reset animation when percentage changes
        setAnimatedPercentage(0);

        // Animate to target percentage
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
                    {/* Define gradient */}
                    <defs>
                        <linearGradient id="progressGradient" gradientTransform="rotate(90)">
                            {/* <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="50%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="#2dd4bf" /> */}
                            <stop offset="0%" stopColor="#A8B4FF" /> {/* 最亮的浅蓝色 */}
                            <stop offset="33%" stopColor="#6674DB" /> {/* 明亮的中蓝色 */}
                            <stop offset="66%" stopColor="#3949AB" /> {/* 主题色light */}
                            <stop offset="100%" stopColor="#152063" /> {/* 主题色dark */}
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

                {/* Animated percentage text */}
                <div
                    className="absolute inset-0 flex items-center justify-center text-4xl font-semibold"
                    style={{
                        transform: 'rotate(0deg)',
                        color: '#3949AB'
                    }}>
                    {Math.round(animatedPercentage)}%
                </div>
            </div>

        </motion.div >
    );
}
