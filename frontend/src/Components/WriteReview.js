import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { reviewsAPI, getToken } from "../utils/api";
import toast from "react-hot-toast";
import "./WriteReview.css";

export default function WriteReview({ productId, productTitle, onReviewSubmitted, existingReview }) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(!existingReview);

  // Debug: Log props
  React.useEffect(() => {
    console.log("WriteReview props:", { productId, productTitle, existingReview });
  }, [productId, productTitle, existingReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submit clicked:", { productId, rating, comment, productIdType: typeof productId });
    
    if (!getToken()) {
      toast.error("Please login to write a review");
      return;
    }

    if (!productId) {
      toast.error("Product ID is missing. Please refresh the page.");
      console.error("Product ID is missing!");
      return;
    }

    if (rating === 0 || rating === null) {
      toast.error("Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Review must be at least 10 characters long");
      return;
    }

    setLoading(true);
    try {
      if (existingReview) {
        // Update existing review
        await reviewsAPI.update(existingReview._id, rating, comment);
        toast.success("Review updated successfully!");
      } else {
        // Create new review
        // Ensure productId is a number
        const numericProductId = typeof productId === 'string' ? parseInt(productId) : productId;
        console.log("Creating review:", { productId: numericProductId, rating, comment });
        
        if (isNaN(numericProductId)) {
          throw new Error("Invalid product ID");
        }
        
        const result = await reviewsAPI.create(numericProductId, rating, comment);
        console.log("Review created:", result);
        toast.success("Review submitted successfully!");
      }
      
      setShowForm(false);
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error("Review submission error:", error);
      const errorMessage = error.message || "Failed to submit review";
      toast.error(errorMessage);
      // Show more details in console for debugging
      if (error.response) {
        console.error("Error response:", error.response);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    setLoading(true);
    try {
      await reviewsAPI.delete(existingReview._id);
      toast.success("Review deleted successfully!");
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  if (!getToken()) {
    return (
      <div className="write-review-container bg-neutral-800 p-6 rounded-md">
        <p className="text-neutral-400 text-center">
          Please <a href="/account" className="text-[#f6aa28] hover:underline">login</a> to write a review
        </p>
      </div>
    );
  }

  if (!showForm && existingReview) {
    return (
      <div className="write-review-container bg-neutral-800 p-6 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-xl font-semibold">Your Review</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(true)}
              className="text-[#f6aa28] hover:underline text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-400 hover:underline text-sm"
              disabled={loading}
            >
              Delete
            </button>
          </div>
        </div>
        <Rating value={existingReview.rating} readOnly size="small" />
        <p className="text-neutral-300 mt-2">{existingReview.comment}</p>
        {existingReview.verifiedPurchase && (
          <span className="text-xs text-green-400 mt-2 inline-block">
            ✓ Verified Purchase
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="write-review-container bg-neutral-800 p-6 rounded-md">
      <h3 className="text-white text-xl font-semibold mb-4">
        {existingReview ? "Edit Your Review" : "Write a Review"}
      </h3>
      {productTitle && (
        <p className="text-neutral-400 text-sm mb-4">Reviewing: {productTitle}</p>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-white text-sm mb-2 block">Rating *</label>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              console.log("Rating changed:", newValue);
              setRating(newValue || 0);
            }}
            size="large"
            precision={1}
          />
          {rating > 0 && (
            <p className="text-neutral-400 text-xs mt-1">
              Selected: {rating} {rating === 1 ? 'star' : 'stars'}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="comment" className="text-white text-sm mb-2 block">
            Your Review *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-32 px-4 py-2 bg-neutral-900 border border-neutral-600 text-white rounded-md focus:outline-none focus:border-[#f6aa28]"
            placeholder="Share your experience with this product..."
            required
            minLength={10}
            maxLength={1000}
          />
          <p className="text-neutral-500 text-xs mt-1">
            {comment.length}/1000 characters
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || rating === 0 || comment.trim().length < 10}
            className="bg-[#f6aa28] text-white px-6 py-2 rounded-md hover:bg-[#cd9940] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : existingReview ? "Update Review" : "Submit Review"}
          </button>
          {existingReview && (
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setRating(existingReview.rating);
                setComment(existingReview.comment);
              }}
              className="bg-neutral-700 text-white px-6 py-2 rounded-md hover:bg-neutral-600 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

