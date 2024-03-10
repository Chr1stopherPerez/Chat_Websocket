// Importation du module Express
const express = require("express");

// Initialisation de l'application Express
const app = express();

// Création du serveur HTTP à l'aide de l'application Express
const http = require("http").Server(app);

// Initialisation de Socket.IO en passant le serveur HTTP
const io = require("socket.io")(http);

// Définition de la route pour la racine "/"
app.get("/", function (req, res) {
  // Envoi du fichier HTML lorsque la route est accédée
  res.sendFile(__dirname + "/index.html");
});

// Gestion des connexions via Socket.IO
io.on("connection", function (socket) {
  // Événement lorsqu'un utilisateur se connecte
  console.log("a user is connected");

  // Événement lorsqu'un utilisateur se déconnecte
  socket.on("disconnect", function () {
    console.log("a user is disconnected");
  });

  // Événement lorsqu'un message est reçu du client
  socket.on("chat message", function (msg) {
    // Affichage du message reçu dans la console du serveur
    console.log("message recu : " + msg);

    // Émission du message à tous les clients connectés
    io.emit("chat message", msg);
  });
});

// Lancement du serveur sur le port 3000
http.listen(3000, function () {
  console.log("Server running on 3000");
});

/* Server.js */
