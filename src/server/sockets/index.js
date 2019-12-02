const io = require('socket.io');
const jwt = require('jwt-simple');
const hlpr = require('../lib/helpers');
const ctrlAuth = require('../controllers/authentication');

const socketKeepAlive = 45000; // ping client every 45 seconds

const connections = {};

exports.startSockets = (httpServer) => {
  const socketIo = io.listen(httpServer);
  socketIo.on('connection', (socket) => {
    const id = setInterval(() => {
      socketIo.send(JSON.stringify(new Date()))
    }, 45000)

      socketIo.on("close", function() {
        console.log("websocket connection close")
        clearInterval(id)
      })

    // connections = socket;
    if (!socket.handshake.secure && process.env.NODE_ENV === 'production') {
      // not secure
      socket.on('end', () => {
        socket.disconnect(0);
      });
    } else if (socket.request.headers.authorization === 'null') {
        // no auth header
      socket.join(socket.id);
      hlpr.logOutArgs('server socketIo', 'try', 'success', 9, null, 'socket', 'socket connect no auth', socket.id);
    } else {
      try {
        const userId = jwt.decode(socket.request.headers.authorization, process.env.AUTH_SECRET);
        ctrlAuth.userById(userId.sub, (user) => {
          // Authed user, send user on connection.
          socket.join(user.stravaId);
          connections[user.stravaId.toString()] = socket;
          socket.emit('action', {
            type: 'FETCH_USER',
            payload: user,
          });
          hlpr.logOutArgs('server socketIo', 'try', 'success', 9, null, 'socket', 'socket connect', socket.stravaId);
          socket.stravaId = user.stravaId.toString();
          socket.on('action', (action) => {
            if (action.type && action.type.indexOf('SOCKET_CONNECT.') === 0) {
              const actionType = action.type.split('.')[1];
              socketIo.in(user.stravaId).emit('action', {
                type: actionType,
                payload: user,
              });
              hlpr.logOutArgs('server socketIo', 'try', 'success', 9, null, 'socket', 'sent msg', socket.stravaId);
            }
          });
        });
      } catch (err) {
        hlpr.logOutArgs('server socketIo', 'catch', 'failure', 5, err, 'socket', 'catch err', null);
        socket.on('end', () => {
          socket.disconnect(0);
        });
      }
    }
  });
  return socketIo;
};

exports.ifConnected = (stravaId, actionType, actionPayload) => {
  if (connections[stravaId.toString()]) {
    hlpr.consLog(['socketSrv.ifConnected', stravaId, actionType, actionPayload]);
    connections[stravaId.toString()].emit('action', {
      type: actionType,
      payload: actionPayload,
    });
  }
};
