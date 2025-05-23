module.exports = (sequelize, DataTypes) => {
  const Grupo = sequelize.define('Grupo', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    torneoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Grupo.associate = models => {
    Grupo.belongsTo(models.Torneo, {
      foreignKey: 'torneoId',
      as: 'torneo'
    });
    
    Grupo.belongsToMany(models.Jugador, {
      through: 'GrupoJugador',
      as: 'jugadores',
      foreignKey: 'grupoId'
    });
    
    Grupo.hasMany(models.Partido, {
      foreignKey: 'grupoId',
      as: 'partidos'
    });
  };

  return Grupo;
};