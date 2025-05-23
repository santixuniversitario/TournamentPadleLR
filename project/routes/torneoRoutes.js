const express = require('express');
const router = express.Router();
const { Torneo, Jugador, Grupo, Partido } = require('../models');

// Listar todos los torneos
router.get('/', async (req, res) => {
  try {
    const torneos = await Torneo.findAll({
      include: [
        {
          model: Jugador,
          as: 'jugadores',
          through: { attributes: [] } // No mostrar datos de la tabla intermedia
        }
      ]
    });
    res.render('torneos/index', { 
      title: 'Listado de Torneos',
      torneos 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar torneos');
  }
});

// Mostrar formulario para crear torneo
router.get('/crear', (req, res) => {
  res.render('torneos/crear', { title: 'Crear Torneo' });
});

// Procesar creación de torneo
router.post('/', async (req, res) => {
  try {
    const { nombre } = req.body;
    const torneo = await Torneo.create({ nombre });
    res.redirect(`/torneos/${torneo.id}/administrar`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear torneo');
  }
});

// Administrar torneo específico
router.get('/:id/administrar', async (req, res) => {
  try {
    const torneo = await Torneo.findByPk(req.params.id, {
      include: [
        {
          model: Jugador,
          as: 'jugadores',
          through: { attributes: ['aceptado'] }
        },
        {
          model: Grupo,
          as: 'grupos',
          include: [
            {
              model: Jugador,
              as: 'jugadores'
            },
            {
              model: Partido,
              as: 'partidos',
              include: [
                { model: Jugador, as: 'jugador1' },
                { model: Jugador, as: 'jugador2' },
                { model: Jugador, as: 'ganador' }
              ]
            }
          ]
        },
        {
          model: Partido,
          as: 'partidos',
          where: { grupoId: null },
          include: [
            { model: Jugador, as: 'jugador1' },
            { model: Jugador, as: 'jugador2' },
            { model: Jugador, as: 'ganador' }
          ],
          required: false
        }
      ]
    });
    
    res.render('torneos/administrar', { 
      title: `Administrar ${torneo.nombre}`,
      torneo 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar torneo');
  }
});


router.get('/PRUEBA', function(req, res, next) {
  res.render('torneos/main', {title: `${torneo.nombre}`});
})
// ... (otros endpoints para manejar grupos, resultados, etc.)

module.exports = router;