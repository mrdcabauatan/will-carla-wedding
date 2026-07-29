import "./AlertModal.css";
import { useEffect } from "react";

export default function AlertModal({
  open,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false,
  closeOnOverlay = true,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (e.key === "Escape") {
        onCancel?.();
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="alert-overlay"
      onClick={() => {
        if (closeOnOverlay) onCancel?.();
      }}
    >
      <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>

        <p>{message}</p>

        <div className="alert-buttons">
          {showCancel && (
            <button className="alert-btn secondary" onClick={onCancel}>
              {cancelText}
            </button>
          )}

          <button className="alert-btn primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
