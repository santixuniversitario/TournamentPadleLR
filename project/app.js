var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var torneoRoute = require('./routes/torneoRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);


//////////////////// MODULO CREACION DE TORNEO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use('/torneos', torneoRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
// Ruta de inicio
app.get('/', (req, res) => {
  res.redirect('/torneos');
});

// Sincronizar DB y arrancar servidor
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Vistas disponibles:`);
    console.log(`- Listado de torneos: http://localhost:${PORT}/torneos`);
    console.log(`- Crear torneo: http://localhost:${PORT}/torneos/crear`);
  });
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
  
});

*/




module.exports = app;
