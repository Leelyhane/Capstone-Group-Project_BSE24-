const { createLogger, transports, format } = require("winston");

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(
    (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
  )
);

const logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: "combined.log" }), // Log all levels to a file
    new transports.File({ filename: "error.log", level: "error" }), // Log errors only to error.log
  ],
});

module.exports = logger; // Export the logger using CommonJS syntax
