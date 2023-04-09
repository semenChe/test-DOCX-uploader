import { useState } from 'react';
import { MISSING_FILE_MESSAGE_ERROR } from '../constants';
import { modifyFile } from '../helpers/files';

const usePreviewModal = (file: File | null, fields: [string, string][]) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [document, setDocument] = useState<Blob | null>(null);

  const showPreviewModal = async () => {
    if (!file) {
      return alert(MISSING_FILE_MESSAGE_ERROR);
    }

    const modifiedFile = await modifyFile(file, Object.fromEntries(fields));
    setDocument(modifiedFile);
    setModalVisible(true);
  };

  const hidePreviewModal = () => {
    setModalVisible(false);
  };

  return {
    document,
    modalVisible,
    showPreviewModal,
    hidePreviewModal,
  };
};

export default usePreviewModal;
