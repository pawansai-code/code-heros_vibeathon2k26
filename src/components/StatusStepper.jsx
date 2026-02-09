import React from 'react';
import { Check, CircleDot, Clock } from 'lucide-react';
import clsx from 'clsx';

const steps = [
    'Request Received',
    'Analyzing Report',
    'Dispatch Sent',
    'Team Dispatched',
    'On the Way',
    'Action in Progress',
    'Resolved'
];

const StatusStepper = ({ currentStep }) => {
    return (
        <div className="relative pl-4 space-y-6 before:absolute before:inset-0 before:left-[1.35rem] before:top-2 before:w-[2px] before:bg-neutral-800 before:-z-10">
            {steps.map((label, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                const isPending = index > currentStep;

                return (
                    <div key={label} className="flex items-center gap-4 relative">
                        <div
                            className={clsx(
                                "w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10",
                                isCompleted ? "bg-green-500 border-green-500 text-black scale-100" :
                                    isActive ? "bg-neutral-950 border-red-500 text-red-500 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.5)]" :
                                        "bg-neutral-950 border-neutral-700 text-neutral-700 scale-90"
                            )}
                        >
                            {isCompleted ? <Check className="w-4 h-4" strokeWidth={3} /> :
                                isActive ? <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> :
                                    <div className="w-2 h-2 bg-neutral-700 rounded-full" />
                            }
                        </div>

                        <div className={clsx("flex flex-col transition-all duration-300", isActive ? "opacity-100 translate-x-0" : isCompleted ? "opacity-60" : "opacity-30")}>
                            <span className={clsx("text-sm font-medium", isActive ? "text-red-400" : "text-white")}>
                                {label}
                            </span>
                            {isActive && (
                                <span className="text-[10px] text-neutral-500 flex items-center gap-1 animate-pulse">
                                    <Clock className="w-3 h-3" /> In Progress...
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatusStepper;
