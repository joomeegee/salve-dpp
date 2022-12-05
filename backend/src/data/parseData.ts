import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';

const dataDirectoryPath = `${cwd()}/src/data/`;
const parseOptions = {
  delimiter: ',',
  from_line: 2,
};

export const parseData = (
  files: string[],
  formatter: (columns: string[]) => { [column: string]: any },
): Array<{ [key: string]: any }> => {
  console.log('Parse Data');

  return files
    .map((file) => {
      const filepath = path.join(dataDirectoryPath, file);
      const csvFile = fs.readFileSync(filepath);

      return parse(csvFile, parseOptions).map(formatter);
    })
    .flat();
};
