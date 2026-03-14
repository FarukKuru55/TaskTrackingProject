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
        console.log("🛠️ MODAL AÇILDI, BACKEND'DEN GELEN HAM VERİ:", selectedTask);
        
        let formattedDate = '';
        
        // 🚀 TARİH TAMİRİ BAŞLIYOR
        if (selectedTask.dueDate) {
          try {
            // Backend'den gelen veriyi (string veya date) JS Date objesine çevir
            const dateObj = new Date(selectedTask.dueDate);
            
            // Eğer tarih geçerliyse ve 1900'den büyükse (0001 kontrolü)
            if (!isNaN(dateObj.getTime()) && dateObj.getFullYear() > 1900) {
              const pad = (n) => String(n).padStart(2, '0');
              
              const year = dateObj.getFullYear();
              const month = pad(dateObj.getMonth() + 1);
              const day = pad(dateObj.getDate());
              const hours = pad(dateObj.getHours());
              const minutes = pad(dateObj.getMinutes());

              // datetime-local input'u için format: YYYY-MM-DDThh:mm
              formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
              console.log("✅ FORMATLANMIŞ TARİH (Inputa giden):", formattedDate);
            }
          } catch (e) {
            console.error("❌ Tarih formatlanırken hata:", e);
          }
        }

        setFormData({
          id: selectedTask.id,
          title: selectedTask.title || '',
          description: selectedTask.description || '',
          priorityId: selectedTask.priorityId || '',
          taskStatusId: selectedTask.taskStatusId || '',
          companyId: selectedTask.companyId || '',
          dueDate: formattedDate, // Kutuyu dolduran asıl yer
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
        api.get('/TaskStatus/getall'),
        api.get('/Staffs/getall')
      ]);
      setCompanies(compRes.data.data);
      setPriorities(prioRes.data.data);
      setStatuses(statRes.data.data);
      setStaffs(staffRes.data.data);

      if (!selectedTask) {
        setFormData(prev => ({
          ...prev,
          priorityId: prev.priorityId || (prioRes.data.data.length > 0 ? prioRes.data.data[0].id : ''),
          taskStatusId: prev.taskStatusId || (statRes.data.data.length > 0 ? statRes.data.data[0].id : ''),
          companyId: prev.companyId || (compRes.data.data.length > 0 ? compRes.data.data[0].id : '')
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
      const currentStaffs = prev.staffIds;
      if (currentStaffs.includes(staffId)) {
        return { ...prev, staffIds: currentStaffs.filter(id => id !== staffId) };
      } else {
        return { ...prev, staffIds: [...currentStaffs, staffId] };
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      title: formData.title,
      description: formData.description,
      priorityId: parseInt(formData.priorityId) || 1,
      taskStatusId: parseInt(formData.taskStatusId) || 1,
      companyId: parseInt(formData.companyId) || 1,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : new Date().toISOString(),
      staffIds: formData.staffIds
    };
    if (selectedTask) finalData.id = formData.id;
    handleSave(finalData);
    setFormData({ title: '', description: '', priorityId: '', taskStatusId: '', dueDate: '', companyId: '', staffIds: [] });
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title fw-bold">
              {selectedTask ? '✏️ Görevi Düzenle' : '✨ Yeni Görev Oluştur'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-bold">Görev Başlığı</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required placeholder="Örn: Veritabanı Optimizasyonu" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Açıklama</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3" required placeholder="Görevin detaylarını yazın..."></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Görevli Personeller</label>
                <div className="border rounded p-2 bg-white" style={{ maxHeight: '120px', overflowY: 'auto' }}>
                  {staffs.length === 0 ? (
                    <small className="text-muted">Kayıtlı personel bulunamadı.</small>
                  ) : (
                    staffs.map(staff => (
                      <div className="form-check" key={staff.id}>
                        <input className="form-check-input" type="checkbox" id={`staff-${staff.id}`}
                          checked={formData.staffIds.includes(staff.id)}
                          onChange={() => handleCheckboxChange(staff.id)} />
                        <label className="form-check-label w-100" htmlFor={`staff-${staff.id}`}>
                          {staff.firstName} {staff.lastName} <small className="text-muted">({staff.position})</small>
                        </label>
                      </div>
                    ))
                  )}
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
              <button type="button" className="btn btn-secondary" onClick={handleClose}>İptal</button>
              <button type="submit" className="btn btn-primary fw-bold px-4">
                {selectedTask ? 'Güncelle' : 'Oluştur'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskAddModal;