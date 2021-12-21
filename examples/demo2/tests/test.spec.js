import oneOf from '../src/utils.js';

describe('A spec suite', function() {
    it('contains a passing spec', function() {
        expect(oneOf('a', ['a', 'b'])).to.be.true;
    });
});