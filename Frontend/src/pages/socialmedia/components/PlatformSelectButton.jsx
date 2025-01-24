import React from "react";

function PlatformSelectButton({ currentIndex, setCurrentIndex, platforms }) {
    const uniquePlatforms = Array.from(
        new Set(platforms.map((platform) => platform.name))
    ).map((name) => ({ name }));

    const handleSelectChange = (event) => {
        const selectedIndex = uniquePlatforms.findIndex(
            (platform) => platform.name === event.target.value
        );
        setCurrentIndex(selectedIndex);
    };

    return (
        <div className="flex flex-row gap-4 items-center">
            <label htmlFor="platform-select" className="font-bold text-gray-700">
                Select Platform:
            </label>
            <select
                id="platform-select"
                value={uniquePlatforms[currentIndex]?.name || ""}
                onChange={handleSelectChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            >
                {uniquePlatforms.map((platform, index) => (
                    <option key={platform.name} value={platform.name}>
                        {platform.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default PlatformSelectButton;