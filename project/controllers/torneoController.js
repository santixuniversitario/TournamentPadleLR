const { Torneo, Jugador, Grupo, Partido } = require('../models');

exports.crearTorneo = async (req, res) => {
  try {
    const { nombre } = req.body;
    const torneo = await Torneo.create({ nombre });
    res.redirect(`/torneos/${torneo.id}/administrar`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear torneo');
  }
};

exports.crearGruposAleatorios = async (req, res) => {
  try {
    const { torneoId } = req.params;
    const { numGrupos } = req.body;
    
    const torneo = await Torneo.findByPk(torneoId, {
      include: [{
        model: Jugador,
        as: 'jugadores',
        where: { aceptado: true },
        through: { where: { aceptado: true } }
      }]
    });
    
    if (!torneo) {
      return res.status(404).send('Torneo no encontrado');
    }
    
    // Mezclar jugadores aleatoriamente
    const jugadores = [...torneo.jugadores];
    jugadores.sort(() => Math.random() - 0.5);
    
    // Crear grupos
    const grupos = [];
    for (let i = 0; i < numGrupos; i++) {
      const grupo = await Grupo.create({
        nombre: `Grupo ${String.fromCharCode(65 + i)}`,
        torneoId
      });
      grupos.push(grupo);
    }
    
    // Asignar jugadores a grupos
    for (let i = 0; i < jugadores.length; i++) {
      const grupoIndex = i % numGrupos;
      await grupos[grupoIndex].addJugador(jugadores[i].id);
    }
    
    // Crear partidos dentro de cada grupo (round robin)
    for (const grupo of grupos) {
      const jugadoresGrupo = await grupo.getJugadores();
      
      for (let i = 0; i < jugadoresGrupo.length; i++) {
        for (let j = i + 1; j < jugadoresGrupo.length; j++) {
          await Partido.create({
            jugador1Id: jugadoresGrupo[i].id,
            jugador2Id: jugadoresGrupo[j].id,
            grupoId: grupo.id,
            torneoId,
            fase: 'grupos'
          });
        }
      }
    }
    
    // Actualizar estado del torneo
    await torneo.update({ estado: 'grupos' });
    
    res.redirect(`/torneos/${torneoId}/administrar`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear grupos');
  }
};

exports.generarFaseFinal = async (req, res) => {
  try {
    const { torneoId } = req.params;
    
    const torneo = await Torneo.findByPk(torneoId, {
      include: [
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
              as: 'partidos'
            }
          ]
        }
      ]
    });
    
    if (!torneo) {
      return res.status(404).send('Torneo no encontrado');
    }
    
    // Determinar clasificados (top 2 de cada grupo)
    const clasificados = [];
    
    for (const grupo of torneo.grupos) {
      const jugadoresConPuntos = await Promise.all(grupo.jugadores.map(async jugador => {
        const partidosGanados = await Partido.count({
          where: {
            grupoId: grupo.id,
            ganadorId: jugador.id
          }
        });
        
        return {
          jugador,
          puntos: partidosGanados * 3 // 3 puntos por victoria
        };
      }));
      
      // Ordenar por puntos
      jugadoresConPuntos.sort((a, b) => b.puntos - a.puntos);
      
      // Tomar los 2 primeros
      clasificados.push(...jugadoresConPuntos.slice(0, 2).map(j => j.jugador));
    }
    
    // Mezclar clasificados para evitar sesgos
    clasificados.sort(() => Math.random() - 0.5);
    
    // Generar fase final según cantidad de clasificados
    let faseInicial = 'octavos';
    if (clasificados.length >= 32) faseInicial = 'dieciseisavos';
    else if (clasificados.length <= 4) faseInicial = 'semifinales';
    else if (clasificados.length <= 8) faseInicial = 'cuartos';
    
    // Crear partidos de la fase inicial
    for (let i = 0; i < clasificados.length; i += 2) {
      if (i + 1 < clasificados.length) {
        await Partido.create({
          jugador1Id: clasificados[i].id,
          jugador2Id: clasificados[i + 1].id,
          torneoId,
          fase: faseInicial
        });
      } else {
        // Jugador avanza sin partido (bye)
        await Partido.create({
          jugador1Id: clasificados[i].id,
          jugador2Id: null,
          torneoId,
          fase: faseInicial
        });
      }
    }
    
    // Actualizar estado del torneo
    await torneo.update({ estado: 'fase_final' });
    
    res.redirect(`/torneos/${torneoId}/administrar`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al generar fase final');
  }
};