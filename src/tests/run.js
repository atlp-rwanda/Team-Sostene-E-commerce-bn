import chai from 'chai';

const { expect } = chai;

function dummyFunction() {
  return 5;
}

describe('Dummy Function', function () {
  it('should return 5', function () {
    const result = dummyFunction();
    expect(result).to.equal(5);
  });
});
