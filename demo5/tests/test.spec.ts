import oneOf from '../src/oneOf';
import rangeArr from '../src/rangeArr';

describe('A spec suite', function() {
    it('contains a passing spec', function() {
        expect(oneOf('a', ['a', 'b'])).to.be.true;
        expect(oneOf(1, ['a', 'b'])).to.be.false;
    });
});

describe('A spec suite2', function() {
    it('contains a passing spec2', function() {
        expect(rangeArr(2)).to.eql([undefined, undefined]);
    });
});