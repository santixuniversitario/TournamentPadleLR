var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/prueba', function(req, res, next) {
  res.render('home-prueba');
});

router.get('/admin-torneo', function(req, res, next) {
  res.render('admin-torneo');
});

router.get('/registro', function(req, res, next) {
  res.render('registro-jugador');
});

router.get('/info', function(req, res, next) {
  res.render('info-torneo');
});

// ABM JUGADOR 
router.get('/ver-jugador', function(req, res, next) {
  res.render('ver-jugador');
});

router.get('/editar-jugador', function(req, res, next) {
  res.render('editar-jugador');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});




/// CRUD CANCHAS

router.get('/alta-canchas', function(req, res, next) {
  res.render('alta-canchas');
});

router.get('/editar-canchas', function(req, res, next) {
  res.render('editar-canchas');
});



// CRUD PARTIDOS

router.get('/carga-partidos', function(req, res, next) {
  res.render('carga-partidos');
});

router.get('/editar-partidos', function(req, res, next) {
  res.render('editar-partidos');
});


//CRUD TORNEO
router.get('/crear-torneo', function(req, res, next) {
  res.render('crear-torneo');
});


router.get('/reg-jugador-torneo', function(req, res, next) {
  res.render('registro-jug-torneo');
});

router.get('/ver-inscriptos', function(req, res, next) {
  res.render('ver-inscriptos', {
    torneos: [
      {
        nombre: "Torneo Candu",
        duplas: [
          { jugador1: "Martín López", jugador2: "Carlos Sánchez" },
          { jugador1: "Ana Torres", jugador2: "Javier Ruiz" }
        ]
      },
      {
        nombre: "Torneo Golden Point",
        duplas: [
          { jugador1: "Pedro Gómez", jugador2: "Lucas Díaz" }
        ]
      }
      // Puedes agregar más torneos aquí
    ]
  });
});


router.get('/prueba-creacion', function(req, res, next) {
  res.render('prueba-formacionTorneo');
});

module.exports = router;
