import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  if (rating < 0 || rating > 5 || isNaN(rating)) return null; // Ensure valid rating range (0 to 5)

  const fullStars = Math.floor(rating); // Full stars count
  const halfStar = rating % 1 !== 0; // Check for half star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="text-yellow-900 w-4 h-4 fill-current" />
      ))}

      {/* Half Star - Two overlapping layers */}
      {halfStar && (
        <div className="relative w-4 h-4">
          <Star className="absolute left-0 top-0 text-yellow-900 w-4 h-4 stroke-current" />
          <Star
            className="absolute left-0 top-0 text-yellow-900 w-4 h-4 fill-current"
            style={{ clipPath: "inset(0 50% 0 0)" }} // Half-filled effect
          />
        </div>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-yellow-900 w-4 h-4 stroke-current" />
      ))}
    </div>
  );
};

export default StarRating;
