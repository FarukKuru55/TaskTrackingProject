import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

const TaskAddModal = ({ show, handleClose, handleSave, selectedTask }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', priorityId: '', taskStatusId: '',
    companyId: '', dueDate: '', staffIds: []
  });

  const [companies, setCompanies] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    if (show) {
      fetchDropdownData();
      if (selectedTask) {
        // ... Mevcut tarih tamiri kodların (Aynen korundu) ...
        let formattedDate = '';
        if (selectedTask.dueDate) {
          try {
            const dateObj = new Date(selectedTask.dueDate);
            if (!isNaN(dateObj.getTime()) && dateObj.getFullYear() > 1900) {
              const pad = (n) => String(n).padStart(2, '0');
              formattedDate = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}T${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;
            }
          } catch (e) { console.error(e); }
        }

        setFormData({
          id: selectedTask.id,
          title: selectedTask.title || '',
          description: selectedTask.description || '',
          priorityId: selectedTask.priorityId || '',
          taskStatusId: selectedTask.taskStatusId || '',
          companyId: selectedTask.companyId || '',
          dueDate: formattedDate,
          staffIds: selectedTask.assignedStaffIds || []
        });
      } else {
        setFormData({ title: '', description: '', priorityId: '', taskStatusId: '', companyId: '', dueDate: '', staffIds: [] });
      }
    }
  }, [show, selectedTask]);

  const fetchDropdownData = async () => {
    try {
      const [compRes, prioRes, statRes, staffRes] = await Promise.all([
        api.get('/Companies/getall'),
        api.get('/Priorities/getall'),
        api.get('/TaskStatuses/getall'), // 🚀 Düzeltme: TaskStatus -> TaskStatuses
        api.get('/Staffs/getall')
      ]);
      
      setCompanies(compRes.data.data || []);
      setPriorities(prioRes.data.data || []);
      setStatuses(statRes.data.data || []);
      setStaffs(staffRes.data.data || []);

      // Yeni kayıt açılıyorsa varsayılan değerleri ata
      if (!selectedTask) {
        setFormData(prev => ({
          ...prev,
          priorityId: prioRes.data.data?.[0]?.id || '',
          taskStatusId: statRes.data.data?.[0]?.id || '',
          companyId: compRes.data.data?.[0]?.id || ''
        }));
      }
    } catch (error) {
      console.error("Dropdown verileri çekilemedi:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (staffId) => {
    setFormData((prev) => {
      const currentStaffs = prev.staffIds || [];
      return currentStaffs.includes(staffId) 
        ? { ...prev, staffIds: currentStaffs.filter(id => id !== staffId) }
        : { ...prev, staffIds: [...currentStaffs, staffId] };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      priorityId: parseInt(formData.priorityId),
      taskStatusId: parseInt(formData.taskStatusId),
      companyId: parseInt(formData.companyId),
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : new Date().toISOString(),
    };
    handleSave(finalData);
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title fw-bold">{selectedTask ? '✏️ Görevi Düzenle' : '✨ Yeni Görev Oluştur'}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label fw-bold">Görev Başlığı</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Açıklama</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3" required></textarea>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Görevli Personeller</label>
                <div className="border rounded p-3 bg-light" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  {staffs.map(staff => (
                    <div className="form-check mb-2" key={staff.id}>
                      <input className="form-check-input" type="checkbox" id={`staff-${staff.id}`}
                        checked={formData.staffIds?.includes(staff.id)}
                        onChange={() => handleCheckboxChange(staff.id)} />
                      <label className="form-check-label" htmlFor={`staff-${staff.id}`}>
                         {staff.firstName} {staff.lastName} <small className="text-muted">- {staff.position}</small>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Öncelik</label>
                  <select className="form-select" name="priorityId" value={formData.priorityId} onChange={handleChange} required>
                    {priorities.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Durum</label>
                  <select className="form-select" name="taskStatusId" value={formData.taskStatusId} onChange={handleChange} required>
                    {statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Şirket / Departman</label>
                  <select className="form-select" name="companyId" value={formData.companyId} onChange={handleChange} required>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Teslim Tarihi</label>
                  <input type="datetime-local" className="form-control" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-link text-muted" onClick={handleClose}>Vazgeç</button>
              <button type="submit" className="btn btn-primary px-5 fw-bold">{selectedTask ? 'Güncelle' : 'Görevi Oluştur'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskAddModal;