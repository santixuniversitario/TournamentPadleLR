var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/prueba', function(req, res, next) {
  res.render('home-prueba');
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



//CRUD TORNEO
router.get('/crear-torneo', function(req, res, next) {
  res.render('crear-torneo');
});


router.get('/reg-jugador-torneo', function(req, res, next) {
  res.render('registro-jug-torneo');
});



router.get('/prueba-creacion', function(req, res, next) {
  res.render('prueba-formacionTorneo');
});

module.exports = router;
