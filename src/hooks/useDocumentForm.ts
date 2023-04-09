import { ChangeEvent, useState, FormEvent } from 'react';
import { MISSING_FILE_MESSAGE_ERROR } from '../constants';
import { modifyFile, saveAs } from '../helpers/files';

const useDocumentForm = () => {
  const [fields, setFields] = useState<[string, string][]>([['', '']]);
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange =
    (index: number, order: number) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      fields[index][order] = event.target.value;

      setFields([
        ...fields.slice(0, index),
        [...fields[index]],
        ...fields.slice(index + 1),
      ]);
    };

  const addNewField = () => {
    setFields([...fields, ['', '']]);
  };

  const removeLastField = () => {
    if (fields.length === 1) {
      return;
    }
    setFields(fields.slice(0, -1));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) {
      return alert(MISSING_FILE_MESSAGE_ERROR);
    }

    const modifiedFile = await modifyFile(file, Object.fromEntries(fields));
    saveAs(modifiedFile, file.name.replace('.docx', '_modified.docx'));
  };

  return {
    file,
    fields,
    handleInputChange,
    addNewField,
    removeLastField,
    handleFileChange,
    handleSubmit,
  };
};

export default useDocumentForm;
