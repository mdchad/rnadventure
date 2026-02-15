import { Star } from "lucide-react";

interface TourReviewsProps {
  reviews: Array<{
    id: string;
    rating: number;
    title: string | null;
    comment: string | null;
    createdAt: Date | null;
    user: {
      name: string;
      image: string | null;
    };
  }>;
  averageRating: number;
  totalReviews: number;
}

export function TourReviews({ reviews, averageRating, totalReviews }: TourReviewsProps) {
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { stars, count, percentage };
  });

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>

      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-600">Based on {totalReviews} reviews</div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm">{stars}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-venture-green" style={{ width: `${percentage}%` }} />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.slice(0, 5).map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-0">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-12 h-12 bg-venture-green rounded-full flex items-center justify-center text-venture-black font-semibold flex-shrink-0">
                {review.user.image ? (
                  <img
                    src={review.user.image}
                    alt={review.user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  review.user.name.charAt(0).toUpperCase()
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{review.user.name}</h4>
                  {review.createdAt && (
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {review.title && <h5 className="font-medium mb-1">{review.title}</h5>}

                {review.comment && <p className="text-gray-700">{review.comment}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
