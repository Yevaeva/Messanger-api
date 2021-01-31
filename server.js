
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
const config = require('./config/');
const debug = require('debug')('api');
const app = require('./src/bootstrap/app');
const http = require('http');
/**
 * Get port from environment and store in Express.
 */
const port = normalize_port(config.server.api_port || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
app.db_connect(config.mongo)
  .then(() => {
    console.log('API is running');
    console.log('Database connection has been established successfully.');
    server.listen(port);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    // process.exit(1);
  });

server.on('error', on_error);
server.on('listening', on_listening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalize_port(val) {
  const port = parseInt(val, 10);
  
  // named pipe
  if (isNaN(port)) return val;
  
  // port number
  if (port >= 0) return port;
  
  return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */
function on_error(error) {
  if (error.syscall !== 'listen') throw error;
  
  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  
  // handle specific listen errors with friendly messages
  console.log('-------------------- App unexpectedly stopped --------------------');
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
function on_listening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  
  debug('Listening on ' + bind);
 
}

module.exports = app;