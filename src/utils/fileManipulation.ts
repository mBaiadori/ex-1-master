import fs from 'fs';
import path from 'path';

export const readJsonArrayFile = (relativeFilePath: string): Promise<any[]> => {
  const resolvedFilePath = path.resolve(__dirname, '../../', relativeFilePath);
  let data;
  return new Promise((resolve, reject) => {
    fs.readFile(resolvedFilePath, { encoding: 'utf-8' }, (err, result) => {
      if (err) throw new Error(err.message);
      data = JSON.parse(result);
      resolve(data);
    });
  });
};
//
export const addObjectInArrayFile = (
  relativeFilePath: string,
  data: object
): Promise<any> => {
  const resolvedFilePath = path.resolve(__dirname, '../../', relativeFilePath);
  const fileData: object[] = JSON.parse(
    fs.readFileSync(resolvedFilePath, { encoding: 'utf-8' })
  );
  fileData.push(data);
  const jsonData = JSON.stringify(fileData);
  return new Promise((resolve, reject) => {
    fs.writeFile(resolvedFilePath, jsonData, (err) => {
      if (err) throw new Error(err.message);
    });
    resolve(true);
  });
};
export const updateArrayFile = (
  relativeFilePath: string,
  data: object
): Promise<any> => {
  const resolvedFilePath = path.resolve(__dirname, '../../', relativeFilePath);
  const jsonData = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fs.writeFile(resolvedFilePath, jsonData, (err) => {
      if (err) throw new Error(err.message);
    });
    resolve(true);
  });
};
