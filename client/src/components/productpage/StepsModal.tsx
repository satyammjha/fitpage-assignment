import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../../components/ui/button";

const StepsModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const steps = [
        "The name you will enter during reviewing the first product will be your username",
        "You won't be able to change it later.",
        "Upload a product image (optional but recommended).",
        "Rate the product between 1 to 5.",
        "Submit your review and stats will be updated.",
        "You can see reviews given by you by clicking view review button",
    ];

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="px-2 py-1 bg-black text-white rounded-md text-sm mb-6"
            >
                View Steps
            </Button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center text-left justify-center">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[100%] max-w-lg relative shadow-lg">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                        >
                            <X size={18} />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                            Steps to Follow
                        </h2>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
                            {steps.map((step, i) => (
                                <li key={i}>{step}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-5 w-full py-2 rounded-md bg-black text-white text-sm"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default StepsModal;