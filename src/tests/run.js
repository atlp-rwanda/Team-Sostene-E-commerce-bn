import chai from "chai";
const expect = chai.expect;

function dummyFunction() {
  return 5;
}

describe('Dummy Function', () => {
  it('should return 5', () => {
    const result = dummyFunction();
    expect(result).to.equal(5);
  });
});