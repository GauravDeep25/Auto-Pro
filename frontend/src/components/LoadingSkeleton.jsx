import React from 'react';

// Reusable skeleton components for loading states
export const CardSkeleton = () => (
    <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 animate-pulse">
        <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-neutral-200 dark:bg-neutral-800 rounded-lg skeleton"></div>
        </div>
        <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded skeleton mb-2"></div>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded skeleton"></div>
    </div>
);

export const ProductCardSkeleton = () => (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden animate-pulse">
        <div className="h-48 bg-neutral-200 dark:bg-neutral-800 skeleton"></div>
        <div className="p-4 space-y-3">
            <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded skeleton"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded skeleton w-3/4"></div>
            <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded skeleton w-1/2 mt-4"></div>
        </div>
    </div>
);

export const TableRowSkeleton = () => (
    <tr className="border-b border-neutral-200 dark:border-neutral-800 animate-pulse">
        <td className="px-4 py-3"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded skeleton w-24"></div></td>
        <td className="px-4 py-3"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded skeleton w-32"></div></td>
        <td className="px-4 py-3"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded skeleton w-20"></div></td>
        <td className="px-4 py-3"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded skeleton w-16"></div></td>
    </tr>
);

export const PageLoader = () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-200 dark:border-neutral-700 border-t-orange-600 dark:border-t-orange-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium pulse-animation">Loading...</p>
    </div>
);

export const GridSkeleton = ({ count = 3 }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} />
        ))}
    </div>
);

export const ProductGridSkeleton = ({ count = 6 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
        ))}
    </div>
);
