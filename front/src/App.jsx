import { useEffect, useState } from 'react'
import api from './api/axiosInstance'
import TaskList from './components/TaskList'
import TaskAddModal from './components/TaskAddModal'
import TaskCompleteModal from './components/TaskCompleteModal' // 🚀 IMPORT UNUTMA
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // 🚀 TAMAMLAMA MODALI İÇİN YENİ STATE'LER
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [pendingTask, setPendingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        taskStatusId: Number(taskData.taskStatusId),
        companyId: Number(taskData.companyId),
        staffIds: taskData.staffIds || [],
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null
      };

      let response;
      if (taskData.id) response = await api.put('/Tasks/update', payload);
      else response = await api.post('/Tasks/add', payload);

      if (response.data.success) {
        Swal.fire('Başarılı!', 'İşlem tamamlandı.', 'success');
        setShowModal(false);
        fetchTasks();
      }
    } catch (error) {
      Swal.fire('Hata!', 'İşlem başarısız.', 'error');
    }
  };

  // 🚀 SÜRÜKLE-BIRAK VE TAMAMLAMA TETİKLEYİCİSİ
  const handleUpdateTaskStatus = (taskId, newStatusId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Eğer ID 3 (Tamamlandı) ise modalı aç
    if (Number(newStatusId) === 3) {
      setPendingTask(task);
      setShowCompleteModal(true);
      return; 
    }

    // Değilse normal statü güncellemesi yap (Örn: Devam Ediyor'a çekme)
    const staffIdsForBackend = task.assignedStaffIds || [];
    const payload = {
      ...task,
      taskStatusId: Number(newStatusId),
      staffIds: staffIdsForBackend,
      dueDate: (task.dueDate && task.dueDate !== "0001-01-01T00:00:00") ? task.dueDate : null
    };

    api.put('/Tasks/update', payload).then(res => { if (res.data.success) fetchTasks(); });
  };

const handleFinalComplete = async (taskId, data) => {
  try {
    // 🕵️‍♂️ PÜF NOKTASI: taskId'nin ve staffId'nin sayı olduğundan emin oluyoruz
    const payload = {
      TaskId: parseInt(taskId), 
      StaffId: pendingTask.assignedStaffIds && pendingTask.assignedStaffIds.length > 0 
               ? parseInt(pendingTask.assignedStaffIds[0]) 
               : 1, // Eğer personel yoksa varsayılan 1 gönder
      Description: data.description || "Açıklama girilmedi.",
      DocumentUrl: data.documentUrl || ""
    };

    console.log("🚀 Backend'e roketlenen paket:", payload);

    const response = await api.post('/Tasks/completetask', payload);
    
    if (response.data.success) {
      setShowCompleteModal(false);
      Swal.fire('Tebrikler!', 'Görev tamamlandı.', 'success').then(() => {
        fetchTasks(); // Listeyi tazele
      });
    }
  } catch (error) {
    console.error("❌ Hata Detayı:", error.response?.data || error.message);
    Swal.fire('Hata!', 'Backend veriyi kabul etmedi (400 Bad Request).', 'error');
  }
};

  const handleDeleteTask = (taskId) => {
    api.delete(`/Tasks/delete?id=${taskId}`).then(res => { if (res.data.success) fetchTasks(); });
  };

  const handleEditTask = (task) => { setSelectedTask(task); setShowModal(true); };

const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.taskStatusId === 1).length,
    inProgress: tasks.filter(t => t.taskStatusId === 2).length,
    completed: tasks.filter(t => t.taskStatusId === 3).length
};

const filteredTasks = tasks.filter(task => 
  task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  task.description?.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="bg-light min-vh-100 pb-5 text-dark">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-0 py-3">
        <div className="container">
          <span className="navbar-brand mb-0 h4 fw-bold">🚀 TaskTracking Pro</span>
        </div>
      </nav>

      {/* Hero Section / Dashboard Panel */}
      <div className="bg-dark py-4 mb-4 shadow-sm border-top border-secondary">
        <div className="container">
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
                    <span className="mb-2" style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <h6 className="small text-uppercase fw-bold opacity-75 mb-1">{item.label}</h6>
                    <h2 className="mb-0 fw-bold">{item.value}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container">
        {/* Filtre ve Aksiyon Çubuğu */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center">
               <h3 className="fw-bold text-secondary mb-0 me-3">Görev Paneli</h3>
              <span className="badge bg-light text-dark border">
                 {filteredTasks.length} Görev Bulundu
            </span>
            </div>
            
            <div className="d-flex gap-2 w-100 w-md-auto mt-2 mt-md-0">
              <input 
                type="text" 
                className="form-control border-2 shadow-none" 
                placeholder="🔍 Görevlerde veya açıklamalarda ara..." 
                style={{minWidth: '250px'}}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // ✨ İşte sihir burada!
              />
              <button className="btn btn-primary shadow-sm px-4 fw-bold text-nowrap" 
                onClick={() => { setSelectedTask(null); setShowModal(true); }}>
                + Yeni Görev
              </button>
            </div>
          </div>
        </div>

        {/* Task Board */}
        <TaskList 
          tasks={filteredTasks} 
          handleDeleteTask={handleDeleteTask} 
          handleEditTask={handleEditTask} 
          handleUpdateTaskStatus={handleUpdateTaskStatus} 
        />
      </div>

      <TaskAddModal show={showModal} handleClose={() => setShowModal(false)} handleSave={handleSaveTask} selectedTask={selectedTask} />
      
      <TaskCompleteModal 
        show={showCompleteModal} 
        handleClose={() => setShowCompleteModal(false)} 
        handleConfirm={handleFinalComplete} 
        task={pendingTask} 
      />
    </div>
  );
}

export default App;