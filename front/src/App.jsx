import { useEffect, useState } from 'react'
import api from './api/axiosInstance'
import TaskList from './components/TaskList'
import TaskAddModal from './components/TaskAddModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = () => {
    api.get('/Tasks/gettaskdetails')
      .then(response => setTasks(response.data.data))
      .catch(err => console.error("Veri çekme hatası:", err));
  };

  const handleSaveTask = async (taskData) => {
    try {
      const payload = {
        title: taskData.title,
        description: taskData.description,
        priorityId: Number(taskData.priorityId),
        taskStatusId: Number(taskData.taskStatusId),
        companyId: Number(taskData.companyId),
        staffIds: taskData.staffIds || [],
        dueDate: taskData.dueDate  // Modal zaten ISO formatına çevirdi
      };

      let response;
      if (taskData.id) {
        payload.id = Number(taskData.id);
        response = await api.put('/Tasks/update', payload);
      } else {
        response = await api.post('/Tasks/add', payload);
      }

      if (response.data.success) {
        Swal.fire('Başarılı!', taskData.id ? 'Görev güncellendi.' : 'Görev eklendi.', 'success');
        setShowModal(false);
        fetchTasks();
      }
    } catch (error) {
      console.error("Hata:", error.response?.data || error);
      Swal.fire('Hata!', 'İşlem sırasında bir sorun oluştu.', 'error');
    }
  };

  const handleUpdateTaskStatus = (taskId, newStatusId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // 🕵️‍♂️ Backend staffIds bekliyor, bizdekine bakıyoruz
    const staffIdsForBackend = task.assignedStaffIds || task.staffIds || [];

    const payload = {
      id: Number(task.id),
      title: task.title,
      description: task.description,
      priorityId: Number(task.priorityId) || 1,
      taskStatusId: Number(newStatusId),
      companyId: Number(task.companyId) || 1,
      staffIds: staffIdsForBackend, // İsim düzeltildi
      // 🚀 Tarih 0001 ise bugünü gönder, yoksa ISO formatına çevir
      dueDate: (task.dueDate && task.dueDate !== "0001-01-01T00:00:00") 
               ? new Date(task.dueDate).toISOString() 
               : new Date().toISOString()
    };

    api.put('/Tasks/update', payload)
      .then(res => { if (res.data.success) fetchTasks(); })
      .catch(err => {
        console.error("Sürükle-Bırak Hatası:", err.response?.data);
        Swal.fire('Hata!', 'Statü güncellenemedi.', 'error');
      });
  };

  const handleDeleteTask = (taskId) => {
    Swal.fire({
      title: 'Emin misin?',
      text: "Bu görevi sildiğinde geri alamazsın!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/Tasks/delete?id=${taskId}`) 
          .then(res => {
            if (res.data.success) {
              Swal.fire('Silindi!', 'Görev başarıyla silindi.', 'success');
              fetchTasks();
            }
          })
          .catch(err => {
            console.error("Silme hatası detay:", err.response?.data);
            Swal.fire('Hata!', 'Görev silinirken bir sorun oluştu.', 'error');
          });
      }
    });
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
          <button className="btn btn-primary shadow-sm px-4 fw-bold"
            onClick={() => { setSelectedTask(null); setShowModal(true); }}>
            + Yeni Görev Ekle
          </button>
        </div>
        <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask} handleUpdateTaskStatus={handleUpdateTaskStatus} />
      </div>
      <TaskAddModal show={showModal} handleClose={() => setShowModal(false)}
        handleSave={handleSaveTask} selectedTask={selectedTask} />
    </div>
  );
}

export default App;