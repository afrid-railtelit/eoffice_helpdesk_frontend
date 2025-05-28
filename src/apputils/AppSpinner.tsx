import React, { useEffect, useState } from "react";

interface AppSpinnerProps {
  isPending: boolean;
  message?: string;
}

const AppSpinner: React.FC<AppSpinnerProps> = ({ isPending, message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isPending) {
      setVisible(true);
    } else {
      timeoutId = setTimeout(() => setVisible(false), 250); // fade out delay
    }

    return () => clearTimeout(timeoutId);
  }, [isPending]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
        isPending ? "opacity-100" : "opacity-0"
      } bg-black/50 backdrop-blur-sm`}
    >
      <div className="flex flex-col items-center gap-4 px-6 py-4 bg-white/10 rounded-xl shadow-lg backdrop-blur-md border border-white/20">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-gray-300 animate-spin" />
        </div>
        {message && (
          <p className="text-white text-sm font-medium text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AppSpinner;
