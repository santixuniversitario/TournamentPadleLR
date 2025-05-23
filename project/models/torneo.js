module.exports = (sequelize, DataTypes) => {
  const Torneo = sequelize.define('Torneo', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('creacion', 'grupos', 'fase_final', 'completado'),
      defaultValue: 'creacion'
    }
  });

  Torneo.associate = models => {
    Torneo.belongsToMany(models.Jugador, {
      through: 'TorneoJugador',
      as: 'jugadores',
      foreignKey: 'torneoId'
    });
    
    Torneo.hasMany(models.Grupo, {
      foreignKey: 'torneoId',
      as: 'grupos'
    });
    
    Torneo.hasMany(models.Partido, {
      foreignKey: 'torneoId',
      as: 'partidos'
    });
  };

  return Torneo;
};