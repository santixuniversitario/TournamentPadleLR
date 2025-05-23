module.exports = (sequelize, DataTypes) => {
  const Partido = sequelize.define('Partido', {
    jugador1Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jugador2Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ganadorId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    torneoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    grupoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fase: {
      type: DataTypes.ENUM('grupos', 'dieciseisavos', 'octavos', 'cuartos', 'semifinales', 'final'),
      allowNull: true
    }
  });

  Partido.associate = models => {
    Partido.belongsTo(models.Torneo, {
      foreignKey: 'torneoId',
      as: 'torneo'
    });
    
    Partido.belongsTo(models.Grupo, {
      foreignKey: 'grupoId',
      as: 'grupo'
    });
    
    Partido.belongsTo(models.Jugador, {
      foreignKey: 'jugador1Id',
      as: 'jugador1'
    });
    
    Partido.belongsTo(models.Jugador, {
      foreignKey: 'jugador2Id',
      as: 'jugador2'
    });
    
    Partido.belongsTo(models.Jugador, {
      foreignKey: 'ganadorId',
      as: 'ganador'
    });
  };

  return Partido;
};