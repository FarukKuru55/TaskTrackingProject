import React from 'react';

const TaskList = ({ tasks, handleDeleteTask, handleEditTask, handleUpdateTaskStatus, handleShowDetail }) => {

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

  const getDueDateInfo = (dueDate) => {
    if (!dueDate || dueDate.startsWith("0001")) return { text: "📅 Tarih Yok", color: "secondary" };
    const now = new Date();
    const deadline = new Date(dueDate);
    const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { text: `⚠️ Gecikti (${Math.abs(diffDays)} gün)`, color: "danger" };
    if (diffDays === 0) return { text: "⏳ Bugün Son!", color: "warning" };
    if (diffDays <= 2) return { text: `🕒 ${diffDays} gün kaldı`, color: "warning" };
    return { text: `📅 ${deadline.toLocaleDateString('tr-TR')}`, color: "info" };
  };

  const handleDragStart = (e, taskId) => { e.dataTransfer.setData("taskId", taskId.toString()); e.currentTarget.style.opacity = '0.4'; };
  const handleDragEnd = (e) => { e.currentTarget.style.opacity = '1'; };
  const handleDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; };
  
  const handleDrop = (e, newStatusId) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData("taskId");
    if (draggedTaskId) handleUpdateTaskStatus(parseInt(draggedTaskId), newStatusId);
  };

  return (
    <div className="row g-4">
      {columns.map(column => {
        const columnTasks = tasks.filter(task => column.matchNames.includes(task.taskStatusName?.toLowerCase().trim()));

        return (
          <div className="col-md-4" key={column.id}>
            <div className={`p-2 ${column.color} text-white rounded-top shadow-sm text-center fw-bold d-flex justify-content-between align-items-center px-3`}>
              <span>{column.name}</span>
              <span className="badge bg-white text-dark rounded-pill">{columnTasks.length}</span>
            </div>

            <div
              className="p-3 rounded-bottom bg-light border shadow-sm"
              style={{ minHeight: '75vh' }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {columnTasks.map(task => {
                const dateInfo = getDueDateInfo(task.dueDate);

                return (
                  <div className="card border-0 shadow-sm mb-3 task-card" key={task.id} 
                    style={{ borderLeft: `5px solid ${column.borderColor}`, cursor: 'grab' }}
                    draggable="true" onDragStart={(e) => handleDragStart(e, task.id)} onDragEnd={handleDragEnd}
                  >
                    <div className="card-header bg-white border-0 pt-3 d-flex justify-content-between">
                      <span className="badge bg-light text-dark border small">🆔 #{task.id}</span>
                      <span className={`badge ${task.priorityName === 'Yüksek' ? 'bg-danger' : 'bg-warning text-dark'}`}>{task.priorityName}</span>
                    </div>

                    <div className="card-body py-2">
                    
                        <h6 
                        className="card-title fw-bold text-dark mb-1 flex-grow-1" 
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); handleShowDetail(task); }}
                      >
                        {task.title}
                      </h6>
                      <button 
                        className="btn btn-link btn-sm p-0 text-muted shadow-none"
                        onClick={(e) => { e.stopPropagation(); handleShowDetail(task); }}
                        title="Detayları Gör"
                      >
                        🔍
                      </button>
                      <p className="card-text text-muted mb-0 small" style={{fontSize: '0.8rem'}}>
                        {task.description?.length > 60 ? task.description.substring(0, 60) + "..." : task.description}
                      </p>
                      <div className="mt-2 text-primary fw-bold small">🏢 {task.companyName}</div>
                    </div>

                    <div className="card-footer bg-white border-0 pb-3">
                      <div className="d-flex justify-content-between align-items-center mb-3 pt-2 border-top">
                        <span className={`badge bg-${dateInfo.color} shadow-sm`}>{dateInfo.text}</span>
                        <div className="d-flex">
                          {task.assignedStaffs?.map((s, i) => (
                            <div key={i} className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center border border-2 border-white fw-bold" 
                              style={{ width: '28px', height: '28px', fontSize: '0.6rem', marginLeft: i > 0 ? '-10px' : '0' }} title={s}>
                              {s.substring(0,2).toUpperCase()}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Çözüm Linki Butonu */}
                      {task.taskStatusId === 3 && (task.documentUrl || task.DocumentUrl) && (
                        <div className="mb-2">
                          <a href={(task.documentUrl || task.DocumentUrl).startsWith('http') ? (task.documentUrl || task.DocumentUrl) : `https://${(task.documentUrl || task.DocumentUrl)}`} 
                             target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-success w-100 fw-bold">🔗 Çözüm Linki</a>
                        </div>
                      )}

                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary w-50" onClick={() => handleEditTask(task)}>✏️ Düzenle</button>
                        <button className="btn btn-sm btn-outline-danger w-50" onClick={() => handleDeleteTask(task.id)}>🗑️ Sil</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;