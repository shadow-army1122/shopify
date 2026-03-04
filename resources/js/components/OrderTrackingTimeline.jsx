import React from 'react';

export default function OrderTrackingTimeline({ status, createdAt, updatedAt }) {
    if (status === 'cancelled') {
        return (
            <div className="p-6 md:p-8 text-center text-red-600 bg-red-50 rounded-2xl border border-red-100">
                <span className="material-icons text-5xl mb-2">cancel</span>
                <h3 className="font-bold text-2xl mb-1">Order Cancelled</h3>
                <p className="text-red-500 text-sm">This order has been cancelled and will not be fulfilled.</p>
            </div>
        );
    }

    const steps = [
        {
            key: 'placed',
            title: 'Order Placed',
            description: 'We received your order successfully.',
            date: new Date(createdAt).toLocaleString(),
            isCompleted: true, // Always true if it exists
            isCurrent: status === 'pending_payment'
        },
        {
            key: 'confirmed',
            title: 'Order Confirmed',
            description: 'Your order has been verified and is being processed.',
            date: status !== 'pending_payment' ? new Date(updatedAt).toLocaleString() : 'Pending confirmation',
            isCompleted: ['processing', 'shipped', 'delivered'].includes(status),
            isCurrent: status === 'processing'
        },
        {
            key: 'shipped',
            title: 'Out for Delivery',
            description: 'Your order has been shipped and is on its way.',
            date: ['shipped', 'delivered'].includes(status) ? new Date(updatedAt).toLocaleString() : 'Pending courier assignment',
            isCompleted: ['shipped', 'delivered'].includes(status),
            isCurrent: status === 'shipped'
        },
        {
            key: 'delivered',
            title: 'Delivered',
            description: 'Your order has been delivered.',
            date: status === 'delivered' ? new Date(updatedAt).toLocaleString() : 'Pending delivery',
            isCompleted: status === 'delivered',
            isCurrent: status === 'delivered'
        }
    ];

    // Read the array backwards for rendering the timeline top-down (newest/upcoming at the top)
    const reversedSteps = [...steps].reverse();

    return (
        <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-8 py-2">
            {reversedSteps.map((step, index) => {
                // Determine styling based on state
                let dotClass = "absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 ";
                let titleClass = "font-bold text-lg ";
                let descClass = "text-sm mt-1 ";

                if (step.isCompleted) {
                    if (step.isCurrent) {
                        // The active top-most completed state
                        dotClass += "bg-primary ring-4 ring-primary/20 border-primary";
                        titleClass += "text-slate-900";
                        descClass += "text-slate-500";
                    } else {
                        // Previously completed state
                        dotClass += "bg-white border-primary";
                        titleClass += "text-slate-900";
                        descClass += "text-slate-500";
                    }
                } else {
                    // Future state
                    dotClass += "bg-white border-slate-300";
                    titleClass += "text-slate-400";
                    descClass += "text-slate-400";
                }

                return (
                    <div key={step.key} className="relative pl-8">
                        <div className={dotClass}></div>
                        <h3 className={titleClass}>{step.title}</h3>
                        {step.isCompleted ? (
                            <p className={descClass}>
                                {step.description}
                                <br />
                                <span className="text-xs font-medium opacity-70 mt-1 inline-block">{step.date}</span>
                            </p>
                        ) : (
                            <p className={descClass}>
                                {step.date}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
