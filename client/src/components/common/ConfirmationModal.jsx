import React from 'react';
import ReactDOM from 'react-dom';

const ConfirmationModal = ({ 
  isOpen, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel', 
  onConfirm, 
  onCancel,
  confirmButtonVariant = 'danger' // 'danger' or 'primary'
}) => {
  if (!isOpen) return null;

  const confirmBtnClass = confirmButtonVariant === 'danger'
    ? 'bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20'
    : 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20';

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center z-[9999] p-6"
      onClick={onCancel}>
      <div className="bg-bg-card border border-border rounded-xl w-full max-w-sm shadow-[0_32px_80px_rgba(0,0,0,0.6)] animate-modal-in"
        onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-[16px] font-semibold text-text-primary">{title}</h2>
          <button onClick={onCancel}
            className="bg-transparent border-none text-text-muted text-sm cursor-pointer px-2 py-1 rounded-md hover:bg-bg-hover hover:text-text-primary transition-all">
            ✕
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <p className="text-[14px] text-text-muted leading-relaxed">
            {message}
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button onClick={onCancel}
              className="flex-1 py-2 bg-bg-input text-text-muted border border-border rounded-lg text-sm font-medium cursor-pointer hover:bg-bg-hover hover:text-text-primary transition-all font-sans">
              {cancelText}
            </button>
            <button onClick={onConfirm}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all font-sans ${confirmBtnClass}`}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
