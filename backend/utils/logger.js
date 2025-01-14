// File: backend/utils/logger.js

const colors = require("colors");

/**
 * Logs a message with a specific log level.
 * @param {string} level - Log level ('info', 'warn', 'error').
 * @param {string} message - The message to log.
 */
const log = (level, message) => {
  const timestamp = new Date().toISOString();
  switch (level.toLowerCase()) {
    case "info":
      console.log(`${timestamp} - INFO: ${message}`.green);
      break;
    case "warn":
      console.warn(`${timestamp} - WARN: ${message}`.yellow);
      break;
    case "error":
      console.error(`${timestamp} - ERROR: ${message}`.red);
      break;
    default:
      console.log(`${timestamp} - LOG: ${message}`.blue);
      break;
  }
};

module.exports = {
  log,
};
