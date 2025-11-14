import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, children, title }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose && onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', h);
    }
    return () => document.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="ModalOverlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        <div className="ModalHeader">
          <h2 className="ModalTitle">{title}</h2>
          <button className="CloseButton" onClick={onClose}>Cerrar</button>
        </div>
        <div className="ModalBody">{children}</div>
      </div>
    </div>
  );
}