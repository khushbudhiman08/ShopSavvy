import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { reviewsAPI, getToken } from "../utils/api";
import { ScaleLoader } from "react-spinners";
import WriteReview from "./WriteReview";
import "./ProductReviews.css";

export default function ProductReviews({ productId, productTitle }) {
  const [reviews, setReviews] = useState([]);
  const [ratingStats, setRatingStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const [reviewsData, ratingData] = await Promise.all([
        reviewsAPI.getByProduct(productId),
        reviewsAPI.getProductRating(productId)
      ]);
      
      setReviews(reviewsData);
      setRatingStats(ratingData);
      
      // Check if user has a review (if logged in)
      const token = getToken();
      if (token) {
        try {
          const myReviews = await reviewsAPI.getMyReviews();
          const myReview = myReviews.find(r => r.productId === productId);
          setUserReview(myReview || null);
        } catch (error) {
          // User might not be logged in or error fetching reviews
          console.error("Error fetching user review:", error);
        }
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = () => {
    loadReviews();
  };

  if (loading) {
    return (
      <div className="product-reviews-container flex justify-center py-8">
        <ScaleLoader color="#f6aa28" height={20} />
      </div>
    );
  }

  return (
    <div className="product-reviews-container bg-neutral-800 p-8 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-white text-2xl font-semibold mb-2">Customer Reviews</h2>
          {ratingStats.totalReviews > 0 ? (
            <div className="flex items-center gap-3">
              <Rating value={ratingStats.averageRating} readOnly precision={0.1} size="large" />
              <span className="text-white text-lg">
                {ratingStats.averageRating.toFixed(1)} out of 5
              </span>
              <span className="text-neutral-400">
                ({ratingStats.totalReviews} {ratingStats.totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          ) : (
            <p className="text-neutral-400">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>

      {/* User's Review Section */}
      {getToken() && (
        <div className="mb-6">
          <WriteReview
            productId={productId}
            productTitle={productTitle}
            onReviewSubmitted={handleReviewSubmitted}
            existingReview={userReview}
          />
        </div>
      )}

      <div className="reviews-list space-y-4">
        {reviews.length === 0 ? (
          <p className="text-neutral-400 text-center py-8">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="review-item bg-neutral-900 p-4 rounded-md border border-neutral-700"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold">{review.userName}</span>
                    {review.verifiedPurchase && (
                      <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                        ✓ Verified Purchase
                      </span>
                    )}
                  </div>
                  <Rating value={review.rating} readOnly size="small" />
                </div>
                <span className="text-neutral-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-neutral-300 mt-2">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

