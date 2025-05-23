module.exports = (sequelize, DataTypes) => {
  const Jugador = sequelize.define('Jugador', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    aceptado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Jugador.associate = models => {
    Jugador.belongsToMany(models.Torneo, {
      through: 'TorneoJugador',
      as: 'torneos',
      foreignKey: 'jugadorId'
    });
  };

  return Jugador;
};