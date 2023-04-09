import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import useDocumentForm from '../hooks/useDocumentForm';
import PreviewModal from '../components/PreviewModal';
import usePreviewModal from '../hooks/usePreviewModal';

const DocumentForm = () => {
  const {
    file,
    fields,
    handleInputChange,
    addNewField,
    removeLastField,
    handleFileChange,
    handleSubmit,
  } = useDocumentForm();

  const { document, modalVisible, showPreviewModal, hidePreviewModal } =
    usePreviewModal(file, fields);

  return (
    <>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3" controlId="formFileInput">
          <Form.Label>Исходный документ</Form.Label>
          <Form.Control
            type="file"
            accept=".docx"
            onChange={handleFileChange}
          />
          <Form.Text className="text-muted">
            Загрузите файл в формате .docx
          </Form.Text>
        </Form.Group>
        {fields.map((field, index) => (
          <Row key={index} className="mb-4">
            <Col xs={12} md={5} className="mb-2 mb-md-0">
              <Form.Group controlId="formInputKey">
                <Form.Control
                  type="text"
                  placeholder="Переменная"
                  onChange={handleInputChange(index, 0)}
                  value={field[0]}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={7}>
              <Form.Group controlId="formInputValue">
                <Form.Control
                  type="text"
                  placeholder="Значение"
                  onChange={handleInputChange(index, 1)}
                  value={field[1]}
                />
              </Form.Group>
            </Col>
          </Row>
        ))}
        <div className="mb-3">
          <Button
            type="button"
            className="me-2"
            variant="primary"
            onClick={addNewField}
          >
            Добавить
          </Button>
          <Button type="button" variant="danger" onClick={removeLastField}>
            Удалить
          </Button>
        </div>
        <div className="d-flex">
          <Button
            type="button"
            variant="warning"
            className="ms-auto me-2"
            onClick={showPreviewModal}
          >
            Предпросмотр
          </Button>
          <Button type="submit" variant="success">
            Получить файл
          </Button>
        </div>
      </Form>
      <PreviewModal
        show={modalVisible}
        hideModal={hidePreviewModal}
        document={document}
      />
    </>
  );
};

export default DocumentForm;
