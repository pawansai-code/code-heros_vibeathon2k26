import React, { useState } from 'react';
import { Camera, Send, X } from 'lucide-react';

const ReportForm = ({ onSubmit, isSubmitting }) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text && !file) return;
        onSubmit({ text, file });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Describe the emergency..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all resize-none h-24 placeholder:text-neutral-600"
                />
            </div>

            <div>
                {preview ? (
                    <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                        <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                        <button
                            type="button"
                            onClick={clearFile}
                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-1 rounded-full text-white backdrop-blur-sm transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <label className="flex items-center gap-3 w-full p-3 bg-neutral-950 border border-dashed border-neutral-700 rounded-xl cursor-pointer hover:bg-neutral-900 transition-colors group">
                        <div className="p-2 bg-neutral-800 rounded-lg group-hover:bg-neutral-700 transition-colors">
                            <Camera className="w-5 h-5 text-neutral-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-neutral-300">Add Photo/Video</span>
                            <span className="text-xs text-neutral-500">Optional evidence</span>
                        </div>
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || (!text && !file)}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
            >
                {isSubmitting ? (
                    <>Processing...</>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        REPORT EMERGENCY
                    </>
                )}
            </button>
        </form>
    );
};

export default ReportForm;
