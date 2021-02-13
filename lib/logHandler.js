
const em = 'express-mock';
const blackhole = () => {};

const getLogHandler = (logger, verbose) => (verbose ? (log) => logger(`${(new Date()).toUTCString()} ${em} ${log}`) : blackHole);

module.exports = getLogHandler;
