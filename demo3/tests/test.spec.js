import oneOf from '../src/oneOf.js';
import isUndened from '../src/isUndened';

describe('A spec suite', function() {
    it('contains a passing spec', function() {
        expect(oneOf('a', ['a', 'b'])).to.be.true;
    });
});


describe('A spec suite1', function() {
    it('contains a passing spec1', function() {
        expect(isUndened(window.undefined)).to.be.true;
    });
});