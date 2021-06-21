const express = require('express');
import cors from 'cors';
// import { logger } from "./middlewares";
import routes from './routes';
import { addObjectInArrayFile } from './utils';

const app = express();
const port = 3000;

app.use(express.json({ limit: '20mb' }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'production URL'
        : `http://127.0.0.1:${port}`
  })
);
//app.use(logger);
app.use(routes);

app.use((err, req, res, _) => {
  if (err && err.statusCode)
    res.status(err.statusCode).json({ message: err.message });
  else res.status(500).json({ message: 'Ooops sometinhg was wrong' });

  const errorData = {
    name: err.name,
    timestamp: Date(),
    request: `[${req.method}] > ${req.originalUrl}`,
    headers: req.headers,
    stack: err.stack.split('\n')
  };
  addObjectInArrayFile('src/logger/error.json', errorData);
});

export default app;
