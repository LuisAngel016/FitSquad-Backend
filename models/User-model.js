const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
      type: String,
      required: true
    },
    rol: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    state: {
      type: String
    },
    goals: {
      type: String
    },
    weight: {
      type: Number
    },
    routinePdfUrl: {
      type: String
    },
    mealPlanPdfUrl: {
      type: String
    },
    profilePhotoUrl: {
      type: String
    },
    createdAt: {
      type: Date,
      default: () => {
        // Obtener la fecha actual en UTC
        const now = new Date();
        // Ajustar la fecha para que tome la hora local de Colombia
        const colombiaOffset = -5 * 60;
        now.setUTCMinutes(now.getUTCMinutes() + colombiaOffset);
        return now;
      },
    },
  });

module.exports = model('User', UserSchema);