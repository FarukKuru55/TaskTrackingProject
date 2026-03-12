import React from 'react';

const TaskList = ({ tasks, handleDeleteTask, handleEditTask, handleUpdateTaskStatus }) => {

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center mt-5 p-5 bg-white rounded shadow-sm">
        <div className="fs-1 mb-3">📁</div>
        <h4 className="text-muted">Henüz hiç görev bulunamadı...</h4>
      </div>
    );
  }

  const columns = [
    { id: 1, name: '📋 BEKLEMEDE', matchNames: ['beklemede', 'bekelemede'], color: 'bg-secondary', borderColor: '#6c757d' },
    { id: 2, name: '🚀 DEVAM EDİYOR', matchNames: ['devam ediyor'], color: 'bg-primary', borderColor: '#0d6efd' },
    { id: 3, name: '✅ TAMAMLANDI', matchNames: ['tamamlandı'], color: 'bg-success', borderColor: '#198754' }
  ];

  const handleDragStart = (e, taskId) => {
    // Sürüklenen ID'yi kuryeye (dataTransfer) veriyoruz
    e.dataTransfer.setData("taskId", taskId.toString());
    e.currentTarget.style.opacity = '0.4'; // Sürüklenirken kart şeffaflaşsın (Çalıştığını anlarsın)
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1'; // Sürükleme bitince kartı eski haline getir
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Bu satır olmazsa DROP çalışmaz!
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, newStatusId) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData("taskId");
    
    if (draggedTaskId) {
      console.log(`🚀 Kart No: ${draggedTaskId} -> Yeni Kolon ID: ${newStatusId}`);
      handleUpdateTaskStatus(parseInt(draggedTaskId), newStatusId);
    }
  };

  return (
    <div className="row g-4">
      {columns.map(column => {
        const columnTasks = tasks.filter(task => {
          const statusName = task.taskStatusName ? task.taskStatusName.toLowerCase().trim() : "";
          return column.matchNames.includes(statusName);
        });

        return (
          <div className="col-md-4" key={column.id}>
            {/* Kolon Başlığı */}
            <div className={`p-2 ${column.color} text-white rounded-top shadow-sm text-center fw-bold d-flex justify-content-between align-items-center px-3`}>
              <span>{column.name}</span>
              <span className="badge bg-white text-dark rounded-pill">{columnTasks.length}</span>
            </div>

            {/* Sürüklenebilir Alan (Droppable) */}
            <div
              className="p-3 rounded-bottom bg-light border-start border-end border-bottom shadow-sm"
              style={{ minHeight: '75vh', transition: 'background-color 0.2s' }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {columnTasks.map(task => (
                <div
                  className="card border-0 shadow-sm mb-3 task-card"
                  key={task.id}
                  style={{ 
                    borderLeft: `5px solid ${column.borderColor}`, 
                    cursor: 'grab',
                    userSelect: 'none' // Yazıların seçilmesini engelleyelim ki sürükleme kolay olsun
                  }}
                  draggable="true" // 🚀 ÖNEMLİ: string "true" olması daha garantidir
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                >
                  {/* Kart İçeriği (Header, Body, Footer aynı kalıyor) */}
                  <div className="card-header bg-white border-0 pt-3">
                    <span className={`badge float-end ${
                      task.priorityName === 'Yüksek' ? 'bg-danger' :
                      task.priorityName === 'Orta' ? 'bg-warning text-dark' : 'bg-info'
                    }`}>
                      {task.priorityName || "Belirsiz"}
                    </span>
                  </div>

                  <div className="card-body py-2">
                    <h6 className="card-title fw-bold text-dark mb-1">{task.title}</h6>
                    <p className="card-text text-muted mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.2rem' }}>
                      {task.description && task.description.length > 80
                        ? task.description.substring(0, 80) + "..."
                        : task.description}
                    </p>
                  </div>

                  <div className="card-footer bg-white border-0 pb-3 mt-1">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="badge rounded-pill bg-success-subtle text-success border border-success">
                          {task.taskStatusName || "Belirsiz"}
                        </span>
                      </div>
                      
                      {/* Personel Avatarları */}
                      <div className="d-flex align-items-center">
                        {task.assignedStaffs && task.assignedStaffs.length > 0 ? (
                          task.assignedStaffs.map((staff, idx) => (
                            <div 
                              key={idx} 
                              className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center border border-2 border-white shadow-sm fw-bold" 
                              style={{ width: '32px', height: '32px', fontSize: '0.75rem', marginLeft: idx > 0 ? '-12px' : '0', zIndex: 10 - idx }}
                              title={staff}
                            >
                              {staff.substring(0, 2).toUpperCase()}
                            </div>
                          ))
                        ) : (
                          <div className="rounded-circle bg-light text-secondary d-flex justify-content-center align-items-center border border-2 border-white shadow-sm" style={{ width: '32px', height: '32px' }}>
                            👤
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary w-50 fw-bold" onClick={() => handleEditTask(task)}>✏️ Düzenle</button>
                      <button className="btn btn-sm btn-outline-danger w-50 fw-bold" onClick={() => handleDeleteTask(task.id)}>🗑️ Sil</button>
                    </div>
                  </div>
                </div>
              ))}

              {columnTasks.length === 0 && (
                <div className="text-center py-5 mt-4 opacity-50 rounded" style={{ border: '2px dashed #ccc' }}>
                  <span className="d-block fs-3 mb-2">☕</span>
                  <span className="small fw-bold">Şimdilik görev yok</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;