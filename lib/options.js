/**
 * Default options to handle the matching conditions
 */

const DefaultOptions = {
    verbose: false,                             // Verbose for matching conditions
    logger: console.log,                        // Logger instance
    status: 200,                                // HTTP status for mock
    response: {                                 // Default text if none given in match
        text: 'This is a hard coded response'
    }
};

module.exports = DefaultOptions;
