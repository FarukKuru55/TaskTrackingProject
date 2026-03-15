import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => { fetchCompanies(); }, []);

  const fetchCompanies = () => {
    api.get('/Companies/getall').then(res => setCompanies(res.data.data));
  };

  const handleAddCompany = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Yeni Şirket Tanımla',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Şirket Adı">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Şirket Adresi">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Kaydet',
      cancelButtonText: 'İptal',
      preConfirm: () => {
        const name = document.getElementById('swal-input1').value;
        const address = document.getElementById('swal-input2').value;
        if (!name) {
          Swal.showValidationMessage('Şirket adı zorunludur!');
          return false;
        }
        return { name: name, address: address };
      }
    });

    if (formValues) {
      api.post('/Companies/add', formValues).then((res) => {
        if (res.data.success) {
          Swal.fire('Başarılı', 'Şirket ve adres bilgisi kaydedildi', 'success');
          fetchCompanies();
        }
      }).catch(err => {
        Swal.fire('Hata', 'Kayıt sırasında bir problem oluştu', 'error');
      });
    }
  };

  const handleDelete = (id) => {
  Swal.fire({
    title: 'Emin misiniz?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Evet, sil!'
  }).then(res => {
    if (res.isConfirmed) {
      // 🚀 URL sonuna id'yi tam bu formatta ekle
      api.delete(`/Companies/delete?id=${id}`) 
        .then(() => {
          Swal.fire('Silindi!', '', 'success');
          fetchCompanies();
        })
        .catch(err => {
          console.error("Silme hatası:", err);
          Swal.fire('Hata!', 'Silme işlemi başarısız oldu.', 'error');
        });
    }
  });
};

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-dark">🏢 Şirket Yönetimi</h3>
        <button className="btn btn-primary fw-bold" onClick={handleAddCompany}>+ Yeni Şirket</button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0"> {/* Kenar boşluklarını sıfırladık daha şık durur */}
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Şirket Adı</th>
                <th>Adres</th>
                <th className="text-end pe-4">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(c => (
                <tr key={c.id}>
                  <td className="ps-4">#{c.id}</td>
                  <td className="fw-bold">{c.name}</td>
                  <td>
                    {c.address ? (
                      <span className="text-secondary">{c.address}</span>
                    ) : (
                      <span className="text-muted small italic">Adres belirtilmemiş</span>
                    )}
                  </td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>
                      🗑️ Sil
                    </button>
                  </td>
                </tr>
              ))}
              {companies.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">Henüz şirket tanımı yapılmamış.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;