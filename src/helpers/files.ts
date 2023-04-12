import Docxtemplater from 'docxtemplater';
import PizZip, { LoadData } from 'pizzip';

const readFile = (file: File) => {
  return new Promise<LoadData>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event.target?.result) {
        return reject();
      }
      resolve(event.target.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsBinaryString(file);
  });
};

const getDocFile = async (file: File) => {
  const binaryString = await readFile(file);

  return new Docxtemplater(new PizZip(binaryString), {
    paragraphLoop: true,
    linebreaks: true,
  });
};

export const modifyFile = async (
  file: File,
  fields: Record<string, string>
) => {
  const doc = await getDocFile(file);

  doc.render(fields);

  return doc.getZip().generate({
    type: 'blob',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    compression: 'DEFLATE',
  });
};

export const saveAs = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('download', filename);
  link.setAttribute('href', url);
  link.click();

  URL.revokeObjectURL(url);
};
