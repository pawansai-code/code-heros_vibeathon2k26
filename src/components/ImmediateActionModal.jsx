import React from 'react';
import { X, HeartPulse, AlertOctagon } from 'lucide-react';

const ImmediateActionModal = ({ actions, severity, onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="bg-red-600/10 p-4 border-b border-red-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-500">
                        <HeartPulse className="w-6 h-6 animate-pulse" />
                        <h3 className="font-bold text-lg">PRE-ARRIVAL INSTRUCTIONS</h3>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-neutral-800 rounded-full transition-colors">
                        <X className="w-5 h-5 text-neutral-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                        <AlertOctagon className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-white mb-1">Ambulance Dispatched</h4>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                                Emergency services have been alerted. Help is on the way.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Immediate Actions</h4>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                            <p className="text-sm text-blue-100 font-medium leading-relaxed">
                                {actions || "Stay calm. Ensure you and others are safe."}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                    >
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImmediateActionModal;
