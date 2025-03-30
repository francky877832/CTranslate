const multer = require('multer');
const path = require('path');

// Définir le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/audio/input/'); // Stocke les fichiers dans le dossier "uploads"
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Renomme le fichier avec un timestamp
  },
});

// Filtrer les fichiers pour n'accepter que l'audio
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers audio sont autorisés !'), false);
  }
};

// Configuration finale de multer
const audioUpload = multer({ storage, fileFilter });

module.exports = { audioUpload };
