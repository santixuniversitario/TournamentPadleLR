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

module.exports = router;
