import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import StarRating from "./StarRating";
import { submitReviewToServer } from "../../lib/api";
import { toast } from 'sonner';

type ReviewFormData = {
    name: string;
    rating: number;
    comment: string;
    userImages: (File | string)[];
};

const ReviewModal = ({ isOpen, onClose, product, onSubmit, existingReview, user }) => {
    const [formData, setFormData] = useState<ReviewFormData>({
        name: "",
        rating: 0,
        comment: "",
        userImages: [],
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (existingReview) {
            const image =
                existingReview?.userImages?.[0] ||
                existingReview?.imageUrl ||
                null;

            setFormData({
                name: existingReview.name || user?.username || "",
                rating: existingReview.rating || 0,
                comment: existingReview.comment || existingReview.review || "",
                userImages: image ? [image] : [],
            });

            setPreviewUrl(image);
        } else {
            setFormData({
                name: user?.username || "",
                rating: 0,
                comment: "",
                userImages: [],
            });

            setPreviewUrl(null);
        }
    }, [existingReview, isOpen]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                userImages: [file],
            }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setFormData((prev) => ({
            ...prev,
            userImages: [],
        }));
        setPreviewUrl(null);
    };

    const handleSubmit = async () => {
        if (!formData.name || formData.rating <= 0) return;
        setLoading(true);

        try {
            const res = await submitReviewToServer({
                username: formData.name,
                productId: product.id,
                rating: formData.rating,
                review: formData.comment,
                imageFile: formData.userImages[0] instanceof File ? formData.userImages[0] : undefined,
            });

            const imageUrl = res?.imageUrl || previewUrl;

            toast.success("✅ Review submitted!");

            onSubmit(product.id, {
                name: formData.name,
                rating: formData.rating,
                comment: formData.comment,
                userImages: [imageUrl],
            });
            setPreviewUrl(imageUrl);
            onClose();
        } catch (err) {
            console.error("❌ Error:", err);
            toast.error("❌ Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const isViewMode = existingReview && !existingReview.editing;
    const disableSubmit = !formData.name || formData.rating <= 0 || loading;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent aria-describedby="review-description">
                <DialogHeader>
                    <DialogTitle>
                        {isViewMode
                            ? "Your Review"
                            : existingReview
                                ? "Edit Review"
                                : "Write Review"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Name *
                        </label>
                        <Input
                            placeholder="Your name"
                            value={user?.username || formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            required
                            disabled={!!user?.username || isViewMode}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                            Rating *
                        </label>
                        <StarRating
                            rating={formData.rating}
                            onRatingChange={(rating) =>
                                setFormData((prev) => ({ ...prev, rating }))
                            }
                            readonly={isViewMode}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Product Image
                        </label>
                        <div className="space-y-2">
                            {previewUrl && (
                                <div className="relative inline-block mr-2">
                                    <img
                                        src={previewUrl}
                                        alt="Uploaded"
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    {!isViewMode && (
                                        <button
                                            onClick={removeImage}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            )}
                            {!isViewMode && !previewUrl && (
                                <label className="inline-flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:border-blue-500 dark:hover:border-blue-400">
                                    <Upload className="h-6 w-6 text-gray-400" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Review
                        </label>
                        <Textarea
                            placeholder="Write your review here..."
                            value={formData.comment}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    comment: e.target.value,
                                }))
                            }
                            disabled={isViewMode}
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={onClose}>
                            {isViewMode ? "Close" : "Cancel"}
                        </Button>
                        {!isViewMode && (
                            <Button onClick={handleSubmit} disabled={disableSubmit}>
                                {loading
                                    ? "Submitting..."
                                    : existingReview
                                        ? "Update Review"
                                        : "Submit Review"}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewModal;