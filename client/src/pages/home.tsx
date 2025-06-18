import { useState, useEffect } from "react";
import { productsData } from "../constants/data";
import ProductCard from "../components/productpage/ProductCard";
import { useUser } from "@/providers/user-provider";
import StatsCard from "@/components/productpage/Stats";
import { Toaster } from "sonner";

type Product = typeof productsData[number] & {
    isReviewed?: boolean;
    review?: any;
};

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [refreshStats, setRefreshStats] = useState(0);

    const { user, loading } = useUser();

    useEffect(() => {
        if (!user || !user.reviews) return;

        const reviewedIds = new Set(user.reviews.map(r => Number(r.productId)));

        const updatedProducts = productsData.map(product => ({
            ...product,
            isReviewed: reviewedIds.has(product.id),
            review: user.reviews.find(r => Number(r.productId) === product.id) || null,
        }));

        setProducts(updatedProducts);
    }, [user]);

    const handleReviewSubmit = (productId, reviewData) => {
        setProducts(prev =>
            prev.map(product =>
                product.id === productId
                    ? { ...product, isReviewed: true, review: reviewData }
                    : product
            )
        );
        setRefreshStats(prev => prev + 1);
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
                <p className="text-gray-500 dark:text-gray-400 text-lg">Loading...</p>
            </div>
        );

    return (
        <>
            <Toaster richColors position="top-right" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mt-8 mx-auto space-y-10">
                    <StatsCard
                        refreshKey={refreshStats}
                        reviews={products.filter(p => p.isReviewed).map(p => p.review)}
                    />

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Product Reviews
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onReviewSubmit={handleReviewSubmit}
                                    user={user}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
