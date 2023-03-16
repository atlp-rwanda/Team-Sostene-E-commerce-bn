import chai from 'chai';

const { expect } = chai;

/**
 * Returns the number 5.
 *
 * @returns {number} The number 5.
 */
function dummyFunction() {
  return 5;
}

describe('Dummy Function', () => {
  it('should return 5', () => {
    const result = dummyFunction();
    expect(result).to.equal(5);
  });
});
