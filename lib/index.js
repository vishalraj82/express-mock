const DefaultOptions = require('./options.js');
const matchRequest = require('./matchRequest.js');

function mockResponse (options) {
    const matchers = options.matchers,
        verbose = options.verbose || DefaultOptions.verbose,
        logger = options.logger || DefaultOptions.logger

    return function (res, res, next) {
        const match = matchRequest(matchers, req);

        if (match) {
            const status = match.status || DefaultOptions.status;
            res.status(status);

            /* Add additional information in res */
            res.expressMock = {
                match: JSON.stringify(match),
                note: 'express-match-request-debug-note'
            };

            if (match.responseFile) {
                if ('JSON' === match.type) {
                    res.setHeader('Content-type', 'text/json');
                }
                res.sendFile(path.resolve(basePath, match.responseFile))
            } else if (match.responseText) {
                res.send(match.responseText);
            } else {
                res.json(DefaultOptions.response);
            }
        } else {
            next();
        }
    }
}

module.exports = mockResponse;
