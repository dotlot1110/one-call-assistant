function ReadyCallDialog({
  isOpen,
  selectedTopic,
  onCancel,
  onStartCall,
}) {
  if (!isOpen) return null;

  return (
    <div className="ready-call-overlay" role="dialog" aria-modal="true">
      <div className="ready-call-modal">
        <span className="call-mode-badge">Ready to call</span>

        <h2 className="ready-call-title">Start with your phone app</h2>

        <p className="ready-call-message">
          Open your phone app and place the call. Keep CallPilot open so you can
          check items while talking.
        </p>

        <div className="call-topic-chip">{selectedTopic}</div>

        <ol className="ready-step-list ready-modal-steps">
          <li>Open your phone app.</li>
          <li>Start the call.</li>
          <li>Come back here and continue.</li>
        </ol>

        <div className="confirm-actions">
          <button
            className="secondary-button half-button"
            type="button"
            onClick={onCancel}
          >
            Back
          </button>

          <button
            className="call-button half-button"
            type="button"
            onClick={onStartCall}
          >
            Call started
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReadyCallDialog;