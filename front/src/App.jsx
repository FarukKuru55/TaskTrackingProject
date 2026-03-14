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

  // 🚀 MODAL ONAYLANDIĞINDA ÇALIŞACAK FONKSİYON
  const handleFinalComplete = async (taskId, data) => {
    try {
      const payload = {
        taskId: taskId,
        staffId: pendingTask.assignedStaffIds[0] || 1, 
        description: data.description,
        documentUrl: data.documentUrl
      };

      const response = await api.post('/Tasks/completetask', payload);
      if (response.data.success) {
        Swal.fire('Tebrikler!', 'Görev başarıyla tamamlandı.', 'success');
        setShowCompleteModal(false);
        fetchTasks();
      }
    } catch (error) {
      Swal.fire('Hata', 'Tamamlama sırasında sorun oluştu.', 'error');
    }
  };

  const handleDeleteTask = (taskId) => {
    api.delete(`/Tasks/delete?id=${taskId}`).then(res => { if (res.data.success) fetchTasks(); });
  };

  const handleEditTask = (task) => { setSelectedTask(task); setShowModal(true); };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <nav className="navbar navbar-dark bg-dark shadow-sm mb-4 py-3">
        <div className="container">
          <span className="navbar-brand mb-0 h4 fw-bold">🚀 TaskTracking Pro</span>
        </div>
      </nav>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-secondary">Görev Paneli</h2>
          <button className="btn btn-primary shadow-sm px-4 fw-bold" onClick={() => { setSelectedTask(null); setShowModal(true); }}>
            + Yeni Görev Ekle
          </button>
        </div>
        <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} handleUpdateTaskStatus={handleUpdateTaskStatus} />
      </div>

      <TaskAddModal show={showModal} handleClose={() => setShowModal(false)} handleSave={handleSaveTask} selectedTask={selectedTask} />
      
      {/* 🚀 TAMAMLAMA MODALINI BURADA ÇAĞIRIYORUZ */}
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