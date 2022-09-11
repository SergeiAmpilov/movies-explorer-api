const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/router');

const { processError, notFoundRequest } = require('./middlewares/error');
const corsEnable = require('./functions/cors-enable');

const { PORT = 3001 } = process.env;

const app = express();
app.use(cookieParser());
app.use(cors(corsEnable));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

// app.use('/.well-known', (req, res, next) => {
//   res.status(200);
// });
app.use(router);
app.use('*', notFoundRequest);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate
app.use(processError);

app.listen(PORT, () => {});
