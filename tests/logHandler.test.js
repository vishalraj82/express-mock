const expect = require('unexpected');
const getLogHandler = require('../lib/logHandler.js');

describe('Test the log handler functionlity', () => {
    it('should return the log handler when verbose', () => {
        const verbose = true,
            logger = console.log,
            logHandler = getLogHandler(logger, verbose);

        expect(logHandler, 'to be a', 'function');
    });

    it('calls the logger with approprite args', () => {
        const verbose = true,
            logger = function (log) { return log; },
            logHandler = getLogHandler(logger, verbose);

        const utcNow = (new Date()).toUTCString(),
            logStmt = 'test log';

        expect(logHandler(logStmt), 'to begin with', utcNow);
        expect(logHandler(logStmt), 'to contain', 'express-mock');
        expect(logHandler(logStmt), 'to end with', 'test log');
    });
});
