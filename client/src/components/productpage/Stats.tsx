import { useState, useEffect } from "react";
import { useUser } from "@/providers/user-provider";
const StatsCard = ({ refreshKey, reviews }) => {
    const [activeTooltip, setActiveTooltip] = useState(null);
    const { user } = useUser();
    const [counts, setCounts] = useState({
        totalProducts: 10,
        totalReviewed: 0,
        avgRating: 0,
        highestRating: 0,
        lowestRating: 0,
    });

    useEffect(() => {
        if (reviews.length > 0) {
            const ratings = reviews.map(r => r.rating);

            const totalReviewed = ratings.length;
            const avgRating = ratings.reduce((acc, r) => acc + r, 0) / totalReviewed;
            const highestRating = Math.max(...ratings);
            const lowestRating = Math.min(...ratings);

            setCounts({
                totalProducts: 10,
                totalReviewed,
                avgRating,
                highestRating,
                lowestRating,
            });
        } else {
            setCounts((prev) => ({
                ...prev,
                totalReviewed: 0,
                avgRating: 0,
                highestRating: 0,
                lowestRating: 0,
            }));
        }
    }, [user?.reviews, refreshKey]);
    const stats = [
        { label: "Total Products", value: counts.totalProducts, tooltip: "Total number of products" },
        { label: "Reviewed", value: counts.totalReviewed, tooltip: "Products you reviewed" },
        { label: "Avg Rating", value: counts.avgRating.toFixed(1), tooltip: "Average rating you gave" },
        { label: "Highest", value: counts.highestRating.toFixed(1), tooltip: "Your highest rating" },
        { label: "Lowest", value: counts.lowestRating.toFixed(1), tooltip: "Your lowest rating" },
    ];

    const handleStatClick = (label) => {
        setActiveTooltip(activeTooltip === label ? null : label);
    };

    return (
        <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Review Stats - start reviewing products to see your stats
            </h3>

            <div className="grid grid-cols-5 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="relative">
                        <div
                            onClick={() => handleStatClick(stat.label)}
                            className="text-center cursor-pointer p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                {stat.label}
                            </div>
                        </div>

                        {activeTooltip === stat.label && (
                            <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg whitespace-nowrap">
                                {stat.tooltip}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {activeTooltip && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setActiveTooltip(null)}
                />
            )}
        </div>
    );
};

export default StatsCard;