function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay" role="dialog" aria-modal="true">
      <div className="confirm-modal">
        <div className="confirm-icon">!</div>

        <h2 className="confirm-title">{title}</h2>

        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button
            className="secondary-button half-button"
            type="button"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>

          <button
            className="delete-history-button half-button"
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;