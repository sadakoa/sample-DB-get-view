/* eslint-disable no-console */

// express set
const app = express();

// --------------------------------------------------------------------

// module
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import stylus from 'stylus';
import autoprefixer from 'autoprefixer-stylus';

// --------------------------------------------------------------------

// routeing variable
import routes from './routes/index';

// --------------------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// stylesheet engine setup
app.use(stylus.middleware({
  src: path.join(__dirname, 'assets'),
  compile: (str, path) => {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(autoprefixer({ browser: ['last 2 versions'] }));
  },
}));

// --------------------------------------------------------------------

// use PATH
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

// --------------------------------------------------------------------

// routes
app.use('/', routes);

// --------------------------------------------------------------------

// port setting
const port = process.env.PORT || 3000;
app.set('port', port);

app.listen(app.get('port'), (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('listen:', app.get('port'));
  }
});

// --------------------------------------------------------------------

module.exports = app;
