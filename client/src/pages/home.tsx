import { useState, useEffect } from "react";
import { productsData } from "../constants/data";
import ProductCard from "../components/productpage/ProductCard";
import { useUser } from "@/providers/user-provider";
import StatsCard from "@/components/productpage/Stats";

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

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
            <StatsCard
                refreshKey={refreshStats}
                reviews={products.filter(p => p.isReviewed).map(p => p.review)}
            />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Product Reviews
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    );
};

export default Home;