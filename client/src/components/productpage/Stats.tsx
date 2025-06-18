import { useState, useEffect } from "react";
import { useUser } from "../../providers/user-provider";
import { productsData } from "../../constants/data";
import { toast } from "sonner";
import StepsModal from "./StepsModal";

const StatsCard = ({ refreshKey, reviews }) => {
    const { user } = useUser();
    const totalProducts = productsData.length;

    const [counts, setCounts] = useState({
        totalProducts: totalProducts,
        totalReviewed: 0,
        avgRating: 0,
        highestRating: 0,
        lowestRating: 0,
    });

    useEffect(() => {
        if (reviews.length > 0) {
            const ratings = reviews.map((r) => r.rating);
            const totalReviewed = ratings.length;
            const avgRating =
                ratings.reduce((acc, r) => acc + r, 0) / totalReviewed;
            const highestRating = Math.max(...ratings);
            const lowestRating = Math.min(...ratings);

            setCounts({
                totalProducts: 10,
                totalReviewed,
                avgRating,
                highestRating,
                lowestRating,
            });

            toast.success("Stats updated based on your latest reviews!");
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
        {
            label: "Total Products listed",
            value: counts.totalProducts,
            tooltip: "You can rate up to 10 different products listed on the platform.",
        },
        {
            label: "Reviewed by you",
            value: counts.totalReviewed,
            tooltip: "Total number of products you've rated or reviewed.",
        },
        {
            label: "Avg Rating given by you",
            value: counts.avgRating.toFixed(1),
            tooltip: "Calculated as total of your ratings divided by number of reviews.",
        },
        {
            label: "Highest rating given by you",
            value: counts.highestRating.toFixed(1),
            tooltip: "This is the highest rating you’ve submitted.",
        },
        {
            label: "Lowest rating given by you",
            value: counts.lowestRating.toFixed(1),
            tooltip: "This is the lowest rating you’ve submitted.",
        },
    ];

    return (
        <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-colors py-1 px-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Your Review Stats
                <span className="block text-xs font-normal text-gray-500 dark:text-gray-400">
                    Start reviewing products to see insights.
                </span>

                <StepsModal />
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="relative text-center p-3 rounded-md transition-all duration-200 group hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer hover:shadow-lg hover:scale-105"
                    >
                        <div className="text-xl font-semibold text-gray-900 dark:text-white">
                            {stat.value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                            {stat.label}
                        </div>

                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1.5 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap">
                            {stat.tooltip}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-gray-900 dark:border-b-gray-700"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsCard;
