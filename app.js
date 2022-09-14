const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/router');

const { processError } = require('./middlewares/error');
const corsEnable = require('./utils/cors-enable');

const { PORT, DB_CONN } = require('./utils/constants');

const app = express();
app.use(cookieParser());
app.use(cors(corsEnable));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(router);

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
});

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate
app.use(processError);

app.listen(PORT, () => {});
