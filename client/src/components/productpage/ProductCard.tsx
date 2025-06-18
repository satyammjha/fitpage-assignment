import { useState } from "react";
import { Eye, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import ReviewModal from "./ReviewModel";

const ProductCard = ({ product, onReviewSubmit, user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <div
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={handleCardClick}
            >
                <div className="aspect-square mb-3 overflow-hidden rounded-md">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                </div>

                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between">
                    {product.isReviewed ? (
                        <Badge className="bg-green-500">Reviewed</Badge>
                    ) : (
                        <Badge variant="destructive">Not Reviewed</Badge>
                    )}

                    <Button
                        size="sm"
                        variant={product.isReviewed ? "outline" : "default"}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsModalOpen(true);
                        }}
                    >
                        {product.isReviewed ? (
                            <>
                                <Eye className="h-4 w-4 mr-1" />
                                View Review
                            </>
                        ) : (
                            <>
                                <Edit className="h-4 w-4 mr-1" />
                                Submit Review
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
                onSubmit={onReviewSubmit}
                existingReview={product.review}
                user={user}

            />
        </>
    );
};

export default ProductCard;