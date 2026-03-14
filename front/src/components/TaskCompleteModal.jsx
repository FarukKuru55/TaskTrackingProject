import React, { useState } from 'react';

const TaskCompleteModal = ({ show, handleClose, handleConfirm, task }) => {
  const [completionData, setCompletionData] = useState({
    description: '',
    documentUrl: ''
  });

  if (!show) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    handleConfirm(task.id, completionData);
    setCompletionData({ description: '', documentUrl: '' }); // Formu sıfırla
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title fw-bold">✅ Görevi Tamamla</h5>
            <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <p className="text-muted small">Görev: <strong>{task?.title}</strong></p>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Neler Yapıldı? (Açıklama)</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  required 
                  placeholder="Yapılan çalışmaları detaylandırın..."
                  value={completionData.description}
                  onChange={(e) => setCompletionData({...completionData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Dosya veya Link (Opsiyonel)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Örn: https://github.com/proje veya Dosya Yolu"
                  value={completionData.documentUrl}
                  onChange={(e) => setCompletionData({...completionData, documentUrl: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Vazgeç</button>
              <button type="submit" className="btn btn-success px-4 fw-bold">Görevi Kapat</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskCompleteModal;