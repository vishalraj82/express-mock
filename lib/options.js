/**
 * Default options to handle the matching conditions
 */

const DefaultOptions = {
    verbose: false,                                         // Verbose for matching conditions
    logger: console.log,                                    // Logger instance
    status: 200,                                            // HTTP status for mock
    response: { text: 'This is a hard coded response' },    // Default text if none given in match
    baseDir: "."                                            // Default path to read response files
};

module.exports = DefaultOptions;
