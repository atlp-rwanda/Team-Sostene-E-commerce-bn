import notificationServices from '../services/notification.services';
import { chats } from './index';

function sockets(io) {
  io.on('connection', async (socket) => {
    socket.on('join', async () => {
      const { authToken } = socket.handshake.query;
      const user = await chats.isValidAuthToken(authToken);
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

    socket.on('disconnect', () => chats.disconnect(socket));
  });
}

export default sockets;
