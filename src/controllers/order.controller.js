import WebSocket from 'ws';
import { orderServices, userServices } from '../services';

// // Initialising web sockets
// const wss = new WebSocket.Server({ port: 4000 });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });
const http = require('http');
// const WebSocket = require('ws');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});

server.listen(4000);


const getOrderStatusEvents = async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('connection', 'keep-alive');
  res.setHeader('Content-Type', 'text/event-stream');

  res.write('event: ping\n');

  // Set up interval to send update events to the client
  const intervalId = setInterval(async () => {
    const orders = await orderServices.getOrdersWithBuyerInfo();
    if (!orders.length > 0) {
      return;
    }
    const data = { orders };
    res.write('event: update\n');
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    orders.forEach(async (item) => {
      item.statusUpdated = false;
      await item.save();
    });
  }, 3000);

  // Handle client disconnect by clearing interval
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userServices.getUserById(userId);
    const orders = await orderServices.getOrdersByUser(userId);

    return res.status(200).json({
      code: '200',
      message: `Fetched all orders of the user ${user.username}`,
      data: { orders },
    });
  } catch (err) {
    return res.status(500).json({
      code: '500',
      message: 'We have an error',
      error: err.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await orderServices.updateOrderStatus(
      orderId,
      req.body.status
    );

    // Emit a notification to the client
    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'orderStatusUpdated',
          message: 'Order status updated successfully',
          data: updatedOrder,
        })
      );
    });

    return res.status(200).json({
      code: '200',
      message: 'Order status updated successfully',
      data: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      code: '500',
      message: 'Server Error',
      error: error.message,
    });
  }
};

export { getOrdersByUser, updateOrderStatus, getOrderStatusEvents };
