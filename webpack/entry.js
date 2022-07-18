import { join } from 'path';

import { rootDir } from './utils/env';

export default {
  main: [
    join(rootDir, '/src/index.jsx'),
    join(__dirname, './utils/cleanConsoleOnHMR.js'),
  ],
};
