import { useEffect, useState } from 'react'
import api from './api/axiosInstance'
import TaskList from './components/TaskList'
import TaskAddModal from './components/TaskAddModal'
import TaskCompleteModal from './components/TaskCompleteModal'
import TaskDetailModal from './components/TaskDetailModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'

// 📊 CHART.JS IMPORTS
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [pendingTask, setPendingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  
  // 🔍 Detay Modalı State'leri
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailTask, setDetailTask] = useState(null);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = () => {
    api.get('/Tasks/gettaskdetails')
      .then(response => setTasks(response.data.data))
      .catch(err => console.error("Veri çekme hatası:", err));
  };

  const handleSaveTask = async (taskData) => {
    try {
      const payload = {
        id: taskData.id ? Number(taskData.id) : 0,
        title: taskData.title,
        description: taskData.description,
        priorityId: Number(taskData.priorityId),
        taskStatusId: Number(taskData.taskStatusId) || 1,
        companyId: Number(taskData.companyId),
        staffIds: taskData.staffIds || [],
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null
      };
      let res = taskData.id ? await api.put('/Tasks/update', payload) : await api.post('/Tasks/add', payload);
      if (res.data.success) {
        Swal.fire('Başarılı!', 'İşlem tamamlandı.', 'success');
        setShowModal(false);
        fetchTasks();
      }
    } catch (error) { Swal.fire('Hata!', 'İşlem başarısız.', 'error'); }
  };

  const handleUpdateTaskStatus = (taskId, newStatusId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    if (Number(newStatusId) === 3) {
      setPendingTask(task);
      setShowCompleteModal(true);
      return; 
    }
    const payload = { ...task, taskStatusId: Number(newStatusId), staffIds: task.assignedStaffIds || [] };
    api.put('/Tasks/update', payload).then(res => { if (res.data.success) fetchTasks(); });
  };

  const handleFinalComplete = async (taskId, data) => {
    try {
      const payload = {
        TaskId: parseInt(taskId), 
        StaffId: pendingTask.assignedStaffIds?.[0] || 1, 
        Description: data.description || "Açıklama girildi.",
        DocumentUrl: data.documentUrl || ""
      };
      const response = await api.post('/Tasks/completetask', payload);
      if (response.data.success) {
        setShowCompleteModal(false);
        Swal.fire('Tebrikler!', 'Görev tamamlandı.', 'success').then(() => fetchTasks());
      }
    } catch (error) { Swal.fire('Hata!', 'Backend veriyi kabul etmedi.', 'error'); }
  };

  const handleShowDetail = (task) => {
    setDetailTask(task);
    setShowDetailModal(true);
  };

  const handleDeleteTask = (taskId) => {
    Swal.fire({
      title: 'Emin misiniz?', text: "Silmek istediğinize emin misiniz?", icon: 'warning',
      showCancelButton: true, confirmButtonText: 'Evet, sil!'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/Tasks/delete?id=${taskId}`).then(res => { if (res.data.success) fetchTasks(); });
      }
    });
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.taskStatusId === 1).length,
    inProgress: tasks.filter(t => t.taskStatusId === 2).length,
    completed: tasks.filter(t => t.taskStatusId === 3).length
  };

  const chartData = {
    labels: ['Beklemede', 'Devam Ediyor', 'Tamamlandı'],
    datasets: [{
      data: [stats.pending, stats.inProgress, stats.completed],
      backgroundColor: ['#ffc107', '#0dcaf0', '#198754'],
      borderWidth: 1,
    }],
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStaff = selectedStaff ? task.assignedStaffs?.includes(selectedStaff) : true;
    return matchesSearch && matchesStaff;
  });

  return (
    <div className="bg-light min-vh-100 pb-5 text-dark">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-0 py-3">
        <div className="container"><span className="navbar-brand mb-0 h4 fw-bold">🚀 TaskTracking Pro</span></div>
      </nav>

      {/* Dashboard Section */}
      <div className="bg-dark py-4 mb-4 shadow-sm border-top border-secondary">
        <div className="container">
          <div className="row g-3 align-items-center">
            <div className="col-md-9">
              <div className="row g-3">
                {[
                  { label: 'Toplam Görev', value: stats.total, color: 'primary', icon: '📋' },
                  { label: 'Beklemede', value: stats.pending, color: 'warning', icon: '⏳' },
                  { label: 'Devam Ediyor', value: stats.inProgress, color: 'info', icon: '🚀' },
                  { label: 'Tamamlandı', value: stats.completed, color: 'success', icon: '✅' }
                ].map((item, index) => (
                  <div className="col-6 col-md-3" key={index}>
                    <div className={`card border-0 shadow-sm bg-gradient text-white h-100 bg-${item.color}`}>
                      <div className="card-body p-3 d-flex flex-column align-items-center justify-content-center">
                        <span className="mb-2" style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                        <h6 className="small text-uppercase fw-bold opacity-75 mb-1" style={{fontSize: '0.7rem'}}>{item.label}</h6>
                        <h2 className="mb-0 fw-bold">{item.value}</h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm p-3 bg-white d-flex align-items-center justify-content-center" style={{ height: '160px' }}>
                <Pie data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Filtre ve Arama Çubuğu */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body py-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
               <h3 className="fw-bold text-secondary mb-0">Görev Paneli ({filteredTasks.length})</h3>
               <button className="btn btn-primary shadow-sm px-4 fw-bold" onClick={() => { setSelectedTask(null); setShowModal(true); }}>+ Yeni Görev Ekle</button>
            </div>
            <hr className="text-muted opacity-25" />
            <div className="row align-items-center g-3">
              <div className="col-md-7 d-flex flex-wrap gap-2 align-items-center">
                <small className="fw-bold text-muted text-uppercase me-2">Sorumlu:</small>
                <button className={`btn btn-sm rounded-pill px-3 ${selectedStaff === null ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setSelectedStaff(null)}>Hepsi</button>
                {[...new Set(tasks.flatMap(t => t.assignedStaffs || []))].map(staff => (
                  <button key={staff} className={`btn btn-sm rounded-pill px-3 ${selectedStaff === staff ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setSelectedStaff(staff)}>👤 {staff}</button>
                ))}
              </div>
              <div className="col-md-5">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted">🔍</span>
                  <input type="text" className="form-control border-start-0 ps-0 shadow-none" placeholder="Arama yap..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <TaskList 
          tasks={filteredTasks} 
          handleDeleteTask={handleDeleteTask} 
          handleEditTask={(task) => { setSelectedTask(task); setShowModal(true); }} 
          handleUpdateTaskStatus={handleUpdateTaskStatus}
          handleShowDetail={handleShowDetail} 
        />
      </div>

      <TaskAddModal show={showModal} handleClose={() => setShowModal(false)} handleSave={handleSaveTask} selectedTask={selectedTask} />
      <TaskCompleteModal show={showCompleteModal} handleClose={() => setShowCompleteModal(false)} handleConfirm={handleFinalComplete} task={pendingTask} />
      
      {/* 🚀 Detay Modalı Entegrasyonu */}
      <TaskDetailModal 
        show={showDetailModal} 
        handleClose={() => { setShowDetailModal(false); setDetailTask(null); }} 
        task={detailTask} 
      />
    </div>
  );
}

export default App;