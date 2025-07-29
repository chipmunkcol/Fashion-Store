import React from "react";

interface LoadingSkeletonProps {
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card">
          {/* Image Skeleton */}
          <div className="aspect-[3/4] skeleton-item" />

          {/* Content Skeleton */}
          <div className="p-3 space-y-2">
            {/* Brand */}
            <div className="h-3 skeleton-item w-16" />

            {/* Name */}
            <div className="space-y-1">
              <div className="h-4 skeleton-item w-full" />
              <div className="h-4 skeleton-item w-3/4" />
            </div>

            {/* Rating */}
            <div className="h-3 skeleton-item w-20" />

            {/* Price */}
            <div className="flex justify-between items-end">
              <div className="h-4 skeleton-item w-16" />
              <div className="h-3 skeleton-item w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
