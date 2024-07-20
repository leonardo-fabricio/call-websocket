const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 8080;

// Servindo arquivos estáticos
app.use(express.static('public'));

// Configurando Socket.IO para ouvir conexões
io.on('connection', (socket) => {
  console.log(`Novo cliente conectado: ${socket.id}`);

  // Evento para lidar com o áudio recebido e transmitido
  socket.on('audio', (data) => {
    // Reencaminhar áudio para todos os outros clientes
    socket.broadcast.emit('audio', data);
  });

  // Evento para lidar com a desconexão do cliente
  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
