import { useEffect, useState } from 'react'
import api from './api/axiosInstance'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('/Tasks/gettaskdetails')
      .then(response => setTasks(response.data.data))
      .catch(err => console.error("Hata:", err));
  }, []);

  return (
    <div className="bg-light min-vh-100">
      {/* Şık Bir Üst Menü */}
      <nav className="navbar navbar-dark bg-dark shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">🚀 TaskTracking Pro</span>
        </div>
      </nav>

      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-secondary">Görev Takip Paneli</h2>
          <button className="btn btn-primary shadow-sm">+ Yeni Görev Ekle</button>
        </div>

        {/* Görev Kartları */}
        <div className="row">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div className="col-md-6 col-lg-4 mb-4" key={task.id}>
                <div className="card h-100 border-0 shadow-sm hover-shadow">
                  <div className="card-header bg-white border-0 pt-3">
                    <span className={`badge float-end ${task.priorityName === 'Yüksek' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                      {task.priorityName}
                    </span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-dark">{task.title}</h5>
                    <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                      {task.description}
                    </p>
                  </div>
                  <div className="card-footer bg-white border-0 pb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">Durum:</small>
                      <span className="badge rounded-pill bg-success-subtle text-success border border-success">
                        {task.taskStatusName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-5">
              <p className="text-muted">Henüz görev bulunamadı...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App