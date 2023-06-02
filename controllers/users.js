const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User-model');



const getUsers = async (req, res = response) => {
  try {
    const users = await User.find({ rol: { $ne: 'super-user' } }).select(
      '-password -email'
    );
    

    res.json({
      ok: true,
      users
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuníquese con el administrador'
    });
  }
};


const getUserById = async (req, res = response) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select('-password -email');

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario inexistente'
      });
    }

    res.json({
      ok: true,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuníquese con el administrador'
    });
  }
};



const updateUser = async (req, res = response) => {
  const userId = req.params.id;

  try {
    const usuario = await User.findById(userId);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario inexistente'
      });
    }

    const { type, password, ...userData } = req.body;

    // Verificar si se envió un archivo PDF y procesarlo
    if (req.file) {
      console.log(req.body.type)
      if (req.body.type === 'mealPlan') {
        // Subir el archivo PDF para el plan alimenticio
        // y guardar la ruta en mealPlanPdfUrl
        const mealPlanPdfPath = req.file.path;
        userData.mealPlanPdfUrl = mealPlanPdfPath;

        // Actualizar la ruta del archivo en el objeto usuario
        usuario.mealPlanPdfUrl = mealPlanPdfPath;
      } else if (req.body.type === 'routine') {
        // Subir el archivo PDF para la rutina
        // y guardar la ruta en routinePdfUrl
        const routinePdfPath = req.file.path;
        userData.routinePdfUrl = routinePdfPath;

        // Actualizar la ruta del archivo en el objeto usuario
        usuario.routinePdfUrl = routinePdfPath;
      }else if (type === 'profilePhoto') {
        // Subir el archivo de foto de perfil
        // y guardar la ruta en profilePhotoUrl
        const profilePhotoPath = req.file.path;
        userData.profilePhotoUrl = profilePhotoPath;

        // Actualizar la ruta de la foto de perfil en el objeto usuario
        usuario.profilePhotoUrl = profilePhotoPath;
      }

      // Guardar los cambios en la base de datos
      await usuario.save();
    }

    // Verificar si se envió una nueva contraseña
    if (password) {
      // Encriptar nueva contraseña
      const salt = bcrypt.genSaltSync();
      userData.password = bcrypt.hashSync(password, salt);
    }

    const upgradedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

    res.json({
      ok: true,
      msg: upgradedUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuníquese con el administrador'
    });
  }
};

module.exports = {
  updateUser, 
  getUsers,
  getUserById
};
