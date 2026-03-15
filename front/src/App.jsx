import { useState } from 'react';
import TasksPage from './pages/TasksPage';
import CompaniesPage from './pages/CompaniesPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import StaffsPage from './pages/StaffsPage';

function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* 🚀 SOL MENÜ (SIDEBAR) */}
      <div className="sidebar shadow-lg">
        <div className="p-4 border-bottom border-secondary text-center">
          <h4 className="fw-bold text-white mb-0">TaskTracking <span className="text-primary">Pro</span></h4>
        </div>
        
        <nav className="nav flex-column mt-3">
          <button 
            className={`nav-link border-0 text-start w-100 bg-transparent ${activeTab === 'tasks' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tasks')}
          >
            📊 Görev Paneli
          </button>
          
          <button 
            className={`nav-link border-0 text-start w-100 bg-transparent ${activeTab === 'companies' ? 'active' : ''}`} 
            onClick={() => setActiveTab('companies')}
          >
            🏢 Şirket Yönetimi
          </button>
          
          <button 
            className={`nav-link border-0 text-start w-100 bg-transparent ${activeTab === 'staffs' ? 'active' : ''}`} 
            onClick={() => setActiveTab('staffs')}
          >
            👥 Personel Yönetimi
          </button>
        </nav>
      </div>

      {/* 🚀 SAĞ İÇERİK ALANI */}
      <div className="content-area bg-light flex-grow-1">
        {activeTab === 'tasks' && <TasksPage />}
        {activeTab === 'companies' && <CompaniesPage />}
        {activeTab === 'staffs' && <StaffsPage />}
      </div>
    </div>
  );
}

export default App;