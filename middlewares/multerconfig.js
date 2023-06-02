const multer = require('multer');
const path = require('path');

// Configuración de Multer para almacenar los archivos en una carpeta específica
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '../public/uploads'); // Ruta completa donde se guardarán los archivos
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const fileName = uniqueSuffix + fileExtension;
    cb(null, fileName); // Nombre del archivo que se guardará en el servidor
  },
});

// Configuración de Multer para aceptar imágenes y archivos PDF
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']; // Extensiones de archivo permitidas
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new Error('El archivo debe ser una imagen (JPG, JPEG, PNG o GIF) o un archivo PDF')); // Rechazar otros tipos de archivos
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
