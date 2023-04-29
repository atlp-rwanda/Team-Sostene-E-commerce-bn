import notificationServices from '../services/notification.services';

import { decodeToken } from '../utils';
import redisClient from './redis';

async function isValidAuthToken(token) {
  let user = null;
  try {
    if (token) {
      user = decodeToken(token);
      const verifiedToken = await redisClient.get(user.id);
      if (verifiedToken) {
        return user;
      }
    }
  } catch (error) {
    return false;
  }
  return false;
}

function sockets(io) {
  io.on('connection', async (socket) => {
    socket.on('join', async () => {
      const { authToken } = socket.handshake.query;
      const user = await isValidAuthToken(authToken);
      if (!authToken || !user) {
        socket.emit('unauthorized', 'Invalid authentication token');
        socket.disconnect(true);
        return;
      }
      const { username, id } = user;
      socket.id = id;
      socket.username = username;
      socket.emit('joined', { id: socket.id, username: socket.username });
    });
    socket.on('notification', async () => {});
    notificationServices.notificationEmitter.on(
      'notification',
      (notification) => {
        if (notification.id === socket.id) {
          socket.emit('notification', notification);
        }
      }
    );

    socket.on('disconnect', () => {
      if (socket.username) {
        socket.broadcast.emit(
          'userLeft',
          `${socket.username} has left the chat`
        );
      }
    });
  });
}

export { isValidAuthToken, sockets };
