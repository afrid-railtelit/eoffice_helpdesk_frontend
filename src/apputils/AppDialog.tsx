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
  const [show, setShow] = useState(false); // controls animation state

  useEffect(() => {
    // Trigger entry animation after component mounts
    const timeout = setTimeout(() => {
      setShow(true);
      document.body.style.overflow = "hidden";
    }, 10); // let initial render finish

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose(); // unmount parent
    }, 300); // match transition duration
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-out ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          if (!noClose) handleClose();
        }}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={`fixed z-50 bg-white shadow-xl rounded-lg flex flex-col max-w-[95vw] max-h-[95vh] w-full sm:w-auto transition-all duration-300 ease-out
          ${
            placement === "RIGHT"
              ? `top-0 right-0 h-full transform ${
                  show ? "translate-x-0" : "translate-x-full"
                }`
              : `top-1/2 left-1/2 transform ${
                  show
                    ? "-translate-x-1/2 -translate-y-1/2 opacity-100"
                    : "-translate-x-1/2 -translate-y-[40%] opacity-0"
                }`
          }
        `}
        style={{
          transformOrigin: placement === "RIGHT" ? "top right" : "center",
        }}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 id="dialog-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
          {!noClose && (
            <button
              aria-label="Close dialog"
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              <X size={20} />
            </button>
          )}
        </header>

        {/* Content */}
        <div className="p-4 overflow-auto flex-1">{children}</div>
      </div>
    </>
  );
}
