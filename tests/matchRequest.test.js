const expect = require('unexpected');
const matchRequest = require('../lib/matchRequest.js');

describe('Test the request matching function', () => {
    const requests = [
        { originalUrl: '/some-fake-url' },
        { originalUrl: '/an/absolute/match' },
        { originalUrl: '/regex-match/' },
        { originalUrl: '/partial-match/should/work' }
    ];

    it('should match all requests when pattern is - ALL', () => {
        const matchers = [
            { pattern: /no-such-pattern/ },
            { pattern: 'ALL', responseText: 'matches-all-requests' },
            { pattern: 'no-match-for-this' }
        ];

        requests.forEach(req => {
            const match = matchRequest(matchers, req);
            expect(match.pattern, 'to equal', 'ALL');
        })
    });

    it('should match complete url as string', () => {
        const matchers = [
            { pattern: '/random-pattern' },
            { pattern: '/an/absolute/match', absolute: true }
        ];

        requests.forEach(req => {
            const match = matchRequest(matchers, req);
            if (match) {
                expect(match.pattern, 'to equal', '/an/absolute/match');
            }
        });
    });

    it('should match partial url as string',  () => {
        const matchers = [
            { pattern: '/some-random-pattern', absolute: true },
            { pattern: '/partial-match' },
            { pattern: /regex-no-match/, absolute: true }
        ];

        requests.forEach(req => {
            const match = matchRequest(matchers, req);
            if (match) {
                expect(req.originalUrl, 'to contain', match.pattern);
            }
        });
    });

    it("should match requests with regex pattern", () => {
        const matchers = [
            { pattern: /regex-match/ },
            { pattern: /\/an\/absolute\/match/ }
        ];

        requests.forEach(req => {
            const match = matchRequest(matchers, req);
            if (match) {
                expect(req.originalUrl, 'to match', match.pattern);
            }
        });
    });
});
