import oneOf from '../src/oneOf';
import rangeArr from '../src/rangeArr';
import scrollTo from '../src/scrollTo';

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

describe('A spec suite3', function() {
    let $body = document.body,
    bodyHeight = getComputedStyle($body).getPropertyValue('height');
    before(function () {
        $body.style.height = '10000px'
    })
    it(`outils.scrollTo() should return true`, function (done) {
        scrollTo($body, 100).then(() => {
            expect((document.documentElement || $body).scrollTop === 100);
            done();
        });
    })
    after(function () {
        $body.scrollTop = 0;
        $body.style.height = bodyHeight;
    })
});