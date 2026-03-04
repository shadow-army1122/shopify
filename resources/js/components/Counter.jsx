import React, { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100 flex items-center gap-4">
            <div className="bg-primary/10 text-primary p-3 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <div>
                <h3 className="font-heading font-bold text-lg">React is Working!</h3>
                <p className="text-sm text-gray-500 mb-2">This is a dynamic React component.</p>
                <button
                    onClick={() => setCount(count + 1)}
                    className="px-3 py-1 bg-primary text-white text-xs font-bold rounded hover:bg-primary-dark transition-colors"
                >
                    Count: {count}
                </button>
            </div>
        </div>
    );
}
