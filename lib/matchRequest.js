/**
 * Function to match current request against a set of matchers under different conditions.
 *
 * @param       Array   machers     An array of conditions
 * @param       Object  req         Express request object
 *
 * @return      Object              Matching condition, iif any
 */
function matchRequest(matchers, req) {
    if (false === Array.isArray(matchers)) {
        throw `Expected options.matchers to be Array, instead got ${typeof matchers}`;
    } 

    const originalUrl = req.originalUrl;

    const match = matchers.find((matcher, index, matchers) => {
        const { pattern, absolute = false} = matcher;

        if ('unefined' === typeof pattern) {
            throw `Expected pattern of type string | RegExp, instead got ${typeof pattern}`;
        }

        let matched = false;

        if (['ALL', '*'].includes(pattern)) {
            matched = true;
        }
        
        if (!matched && (pattern instanceof RegExp || ('object' === typeof pattern && pattern.constructor && 'RegExp' === pattern.contructor.name))) {
            matched = pattern.test(originalUrl);
        }
        
        if (!matched && originalUrl.indexOf(pattern) > -1) {
            if (absolute && pattern === originalUrl) {
                matched = true;
            } else if (!absolute && originalUrl.indexOf(pattern) > -1) {
                matched = true;
            }
        }

        return matched;
    });

    return match;
}

module.exports = matchRequest;
