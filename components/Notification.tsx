'use client'
import React from 'react'
import { twMerge } from 'tailwind-merge';
interface NOTIC_PROPS {
    children: React.ReactNode;
    className?: string;
}

export default function Notification({
    children,
    className
}: NOTIC_PROPS) {
    return (
        <div
            className={twMerge('absolute top-20 rounded-md p-4 flex items-center justify-start gap-x-2', className)}
        >
            {children}
        </div>
    )
}
