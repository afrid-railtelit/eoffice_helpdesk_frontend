import { ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";

interface AppDialogProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  placement?: "CENTER" | "RIGHT";
  noClose?: boolean;
}

export default function AppDialog({
  title,
  children,
  onClose,
  noClose,
  placement = "CENTER",
}: AppDialogProps) {
  const [visible, setVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Show dialog on mount, then trigger animation on next frame
    setVisible(true);
    requestAnimationFrame(() => {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function closeDialog() {
    setIsAnimating(false);

    setTimeout(() => {
      setVisible(false);
      onClose();
      document.body.style.overflow = "";
    }, 350); // match updated transition duration
  }

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => {
          if (!noClose) {
            closeDialog();
          }
        }}
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs bg-opacity-50  z-[50] transition-opacity duration-350 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={`fixed z-[50] bg-white shadow-lg rounded-md flex flex-col
          transition-transform duration-350 ease-out w-[95vw] h-[95vh] lg:w-fit lg:h-fit
          ${
            placement === "RIGHT"
              ? "top-0 right-0 h-full "
              : "top-1/2 left-1/2 max-h-[95vh]   -translate-x-1/2 -translate-y-1/2"
          }
          ${isAnimating ? "opacity-100" : "opacity-0"}
          ${
            placement === "RIGHT"
              ? isAnimating
                ? "translate-x-0"
                : "translate-x-full"
              : isAnimating
              ? "scale-100"
              : "scale-95"
          }
        `}
        style={{
          transformOrigin: placement === "RIGHT" ? "top right" : "center",
          willChange: "transform, opacity",
        }}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <h2
            id="dialog-title"
            className="text-lg font-semibold text-gray-900 select-none"
          >
            {title}
          </h2>
          {!noClose && (
            <button
              aria-label="Close dialog"
              onClick={closeDialog}
              className="text-gray-600 hover:text-gray-900 transition cursor-pointer"
            >
              <X size={20} />
            </button>
          )}
        </header>

        {/* Scrollable content */}
        <div className="p-4 overflow-auto flex-1">{children}</div>
      </div>
    </>
  );
}
