import React from 'react';
import '../assets/css/Modal.css';

const ApproveModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-close" onClick={onClose}>
          &times;
        </div>
        {children}
      </div>
    </div>
  );
};

export default ApproveModal;