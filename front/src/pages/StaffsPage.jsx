import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';

const StaffsPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchStaffs();
    fetchCompanies();
  }, []);

  const fetchStaffs = () => {
    api.get('/Staffs/getall').then(res => setStaffs(res.data.data || []));
  };

  const fetchCompanies = () => {
    api.get('/Companies/getall').then(res => setCompanies(res.data.data || []));
  };

const handleAddStaff = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Yeni Personel Ekle',
      html:
        `<input id="firstName" class="swal2-input" placeholder="Ad">` +
        `<input id="lastName" class="swal2-input" placeholder="Soyad">` +
        `<input id="email" class="swal2-input" placeholder="E-posta Adresi">` + // 🚀 YENİ: Email inputu
        `<input id="position" class="swal2-input" placeholder="Pozisyon (Örn: Yazılımcı)">` +
        `<select id="companyId" class="swal2-select" style="width:80%">` +
          `<option value="">Şirket Seçiniz...</option>` +
          `${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}` +
        `</select>`,
      focusConfirm: false,
      preConfirm: () => {
        const firstName = document.getElementById('firstName').value;
        const companyId = document.getElementById('companyId').value;
        
        if (!firstName || !companyId) {
          Swal.showValidationMessage('Ad ve Şirket alanları zorunludur!');
          return false;
        }

        return {
          firstName: firstName,
          lastName: document.getElementById('lastName').value,
          email: document.getElementById('email').value, // 🚀 YENİ: Email verisi
          position: document.getElementById('position').value,
          companyId: parseInt(companyId)
        }
      }
    });

    if (formValues) {
      api.post('/Staffs/add', formValues).then(() => {
        Swal.fire('Başarılı', 'Personel ve iletişim bilgileri kaydedildi', 'success');
        fetchStaffs();
      }).catch(err => {
        Swal.fire('Hata', 'Kayıt yapılamadı, verileri kontrol edin', 'error');
      });
    }
  };

  const handleDeleteStaff = (id) => {
    Swal.fire({
      title: 'Emin misiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet, sil!'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/Staffs/delete?id=${id}`).then(() => {
          Swal.fire('Silindi!', '', 'success');
          fetchStaffs();
        });
      }
    });
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-dark">👥 Personel Yönetimi</h3>
        <button className="btn btn-primary fw-bold" onClick={handleAddStaff}>+ Yeni Personel Ekle</button>
      </div>
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Personel</th>
                <th>Ünvan</th>
                <th>Bağlı Şirket</th>
                <th className="text-end pe-4">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map(s => (
                <tr key={s.id}>
                  <td className="ps-4 fw-bold">👤 {s.firstName} {s.lastName}</td>
                  <td><span className="badge bg-info-subtle text-info">{s.position}</span></td>
                  <td><span className="text-primary fw-bold">🏢 {s.companyName || 'Genel'}</span></td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteStaff(s.id)}>🗑️ Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffsPage;