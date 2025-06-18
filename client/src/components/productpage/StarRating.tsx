import { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-6 w-6 cursor-pointer transition-colors ${
            star <= (hoveredRating || rating) 
              ? "fill-yellow-400 text-yellow-400" 
              : "text-gray-300 dark:text-gray-600"
          } ${readonly ? "cursor-default" : ""}`}
          onClick={() => !readonly && onRatingChange(star)}
          onMouseEnter={() => !readonly && setHoveredRating(star)}
          onMouseLeave={() => !readonly && setHoveredRating(0)}
        />
      ))}
    </div>
  );
};

export default StarRating;