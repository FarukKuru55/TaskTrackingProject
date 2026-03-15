import { Modal, Button, Badge } from 'react-bootstrap';

const TaskDetailModal = ({ show, handleClose, task }) => {
  if (!task) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold text-primary">
          🔍 Görev Detayı: {task.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="row g-4">
          <div className="col-md-8">
            <h5 className="fw-bold border-bottom pb-2">Açıklama</h5>
            <p className="text-muted" style={{ whiteSpace: 'pre-wrap' }}>
              {task.description || "Açıklama girilmemiş."}
            </p>

            {task.taskStatusId === 3 && (
              <div className="mt-4 p-3 bg-success-subtle border border-success rounded">
                <h6 className="fw-bold text-success">✅ Tamamlama Notu</h6>
                <p className="mb-0 small text-dark">{task.description}</p>
              </div>
            )}
          </div>
          
          <div className="col-md-4 border-start">
            <h6 className="fw-bold text-muted small text-uppercase">Bilgiler</h6>
            <div className="mb-3">
              <label className="d-block small text-muted">Statü:</label>
              <Badge bg={task.taskStatusId === 3 ? 'success' : 'primary'}>{task.taskStatusName}</Badge>
            </div>
            <div className="mb-3">
              <label className="d-block small text-muted">Öncelik:</label>
              <Badge bg={task.priorityName === 'Yüksek' ? 'danger' : 'warning text-dark'}>{task.priorityName}</Badge>
            </div>
            <div className="mb-3">
              <label className="d-block small text-muted">Şirket:</label>
              <div className="fw-bold">🏢 {task.companyName}</div>
            </div>
            <div className="mb-3">
              <label className="d-block small text-muted">Sorumlular:</label>
              <div className="d-flex flex-wrap gap-1">
                {task.assignedStaffs?.map((s, i) => <Badge key={i} bg="dark" pill>{s}</Badge>)}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetailModal;