const path = require('path');
const DefaultOptions = require('./options.js');
const matchRequest = require('./matchRequest.js');
const getLogHandler = require('./logHandler.js');

function mockResponse (options) {
    const matchers = options.matchers,
        verbose = options.verbose || DefaultOptions.verbose,
        logger = options.logger || DefaultOptions.logger,
        baseDir = options.baseDir || DefaultOptions.baseDir;

    const log = getLogHandler(logger, verbose);

    return function (req, res, next) {
        const match = matchRequest(matchers, req);

        if (match) {
            log(`Request matched with ${JSON.stringify(match)}`);
            const status = match.status || DefaultOptions.status;
            res.status(status);

            /* Add additional information in res */
            log(`Adding property expressMock to res`);
            res.expressMock = {
                match: JSON.stringify(match),
                source: 'express-mock-debug'
            };

            if (match.responseFile) {
                if ('JSON' === match.type) {
                    res.setHeader('Content-type', 'text/json');
                }
                res.sendFile(path.resolve(baseDir, match.responseFile));
            } else if (match.responseJson) {
                res.setHeader('Content-type', 'text/json');
                res.send(match.responseJson);
            } else if (match.responseText) {
                res.send(match.responseText);
            } else {
                res.json(DefaultOptions.response);
            }
        } else {
            log('No match found, forwarding control to next handler');
            next();
        }
    }
}

module.exports = mockResponse;
