import {
  AlertTriangle,
  Ambulance,
  CheckCircle2,
  Flame,
  Siren,
} from "lucide-react";
import { useEffect, useState } from "react";
// Components (to be created)
import { analyzeReport } from "../services/gemini";
import ImmediateActionModal from "./ImmediateActionModal";
import ReportForm from "./ReportForm";
import StatusStepper from "./StatusStepper";

const EmergencySystem = () => {
  const [statusStep, setStatusStep] = useState(0); // 0: Idle/Request Received
  const [reportData, setReportData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [showDispatchToast, setShowDispatchToast] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);

  // Stepper logic
  useEffect(() => {
    if (statusStep > 0 && statusStep < 5) {
      const timer = setTimeout(() => {
        setStatusStep((prev) => prev + 1);
      }, 10000); // 10 seconds per step
      return () => clearTimeout(timer);
    }
  }, [statusStep]);

  const handleReportSubmit = async (data) => {
    setReportData(data);
    setStatusStep(1); // Start Tracking

    // AI Analysis Call
    try {
      const result = await analyzeReport(data.text, data.file);
      setAiAnalysis(result);
      setShowDispatchToast(true);
      setStatusStep(2); // Dispatch Sent

      // Show modal for critical info
      if (
        result.classification.includes("Medical") ||
        result.severity === "Critical" ||
        result.severity === "High"
      ) {
        setTimeout(() => setShowActionModal(true), 500);
      }
    } catch (error) {
      console.error("AI Analysis failed", error);
      // Fallback for demo if API fails
      setStatusStep(2);
      setShowDispatchToast(true);
    }

    // Hide toast after 3s
    setTimeout(() => setShowDispatchToast(false), 5000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-red-500/30">
      {/* Header */}
      <header className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 notranslate">
          <BadgeAlertParams className="w-8 h-8 text-red-500 animate-pulse" />
          <h1 className="text-xl font-bold tracking-tight">
            RAPID<span className="text-red-500">RESPONSE</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Flame className="w-5 h-5 text-orange-500/50" />
              <span className="text-[10px] text-neutral-500 uppercase">
                Fire
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Siren className="w-5 h-5 text-blue-500/50" />
              <span className="text-[10px] text-neutral-500 uppercase">
                Police
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Ambulance className="w-5 h-5 text-red-500/50" />
              <span className="text-[10px] text-neutral-500 uppercase">
                Medic
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6 pb-20">
        {/* Helper Badge */}
        <div className="flex justify-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
            <span className="text-xs font-medium text-red-400">
              Emergency System Active
            </span>
          </div>
        </div>

        {/* Form Section */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Report Emergency
          </h2>
          <ReportForm
            onSubmit={handleReportSubmit}
            isSubmitting={statusStep === 1 && !aiAnalysis}
          />
        </section>

        {/* Live Tracking Section */}
        {statusStep > 0 && (
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Live Status
            </h2>
            <StatusStepper currentStep={statusStep} />
          </section>
        )}
      </main>

      {/* Toast */}
      {showDispatchToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-5 h-5" />
          Dispatch Sent
        </div>
      )}

      {/* Modal */}
      {showActionModal && aiAnalysis && (
        <ImmediateActionModal
          actions={aiAnalysis.immediateActions}
          severity={aiAnalysis.severity}
          onClose={() => setShowActionModal(false)}
        />
      )}
    </div>
  );

  // Helper component for Icon (defined inside to avoid import error if Lucide changes)
  function BadgeAlertParams(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.74Z" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
    );
  }
};

export default EmergencySystem;
