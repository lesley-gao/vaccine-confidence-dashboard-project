import React from "react";

function PlatformSelectButton({ currentIndex, setCurrentIndex, platforms }) {
    const handleSelectChange = (event) => {
        const selectedIndex = platforms.findIndex(
            (platform) => platform === event.target.value
        );
        setCurrentIndex(selectedIndex);
    };

    return (
        <div className="flex flex-row gap-4 items-center">
            <label htmlFor="platform-select" className="font-bold text-gray-700 dark:text-white">
                Select Platform:
            </label>
            <select
                id="platform-select"
                value={platforms[currentIndex] || ""}
                onChange={handleSelectChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[200px] dark:text-gray-700"
            >
                {platforms.map((platform, index) => (
                    <option key={index} value={platform}>
                        {platform}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default PlatformSelectButton;
