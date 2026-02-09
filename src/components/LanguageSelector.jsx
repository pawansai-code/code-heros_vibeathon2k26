import { ChevronDown, Languages } from "lucide-react";
import { useState } from "react";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  const languages = [
    { name: "English", code: "en" },
    { name: "Tamil", code: "ta" },
    { name: "Hindi", code: "hi" },
    { name: "Telugu", code: "te" },
  ];

  const changeLanguage = (lang) => {
    const selectElement = document.querySelector(".goog-te-combo");
    if (selectElement) {
      selectElement.value = lang.code;
      selectElement.dispatchEvent(new Event("change"));
      setCurrentLang(lang.name);
      setIsOpen(false);
    } else {
      // Fallback: try using the cookie method if the widget isn't fully loaded
      document.cookie = `googtrans=/en/${lang.code}; path=/`;
      window.location.reload();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg border border-neutral-700 transition-all duration-200 shadow-lg"
      >
        <Languages className="w-4 h-4 text-red-500" />
        <span className="text-sm font-medium">{currentLang}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[60]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl z-[70] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang)}
                className="w-full text-left px-4 py-2.5 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors flex items-center justify-between"
              >
                {lang.name}
                {currentLang === lang.name && (
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
