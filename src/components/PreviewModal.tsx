import { useRef, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { renderAsync } from 'docx-preview';

interface PreviewModalProps {
  show: boolean;
  hideModal: () => void;
  document: Blob | null;
}

const PreviewModal = ({ show, document, hideModal }: PreviewModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (show && ref.current) {
      setLoading(true);
      renderAsync(document, ref.current).then(() => setLoading(false));
    }
  }, [show, ref]);

  return (
    <Modal show={show} onHide={hideModal} scrollable fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Предварительный просмотр</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={ref} className="docx-preview"></div>
        {loading && (
          <div className="d-flex w-100 h-100">
            <Spinner animation="border" variant="primary" className="m-auto" />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideModal} variant="secondary">
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreviewModal;
