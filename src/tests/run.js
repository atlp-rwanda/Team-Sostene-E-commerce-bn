import { expect } from 'chai';

/**
 * Returns the value 5.
 *
 * @returns {number} The value 5.
 */
function dummyFunction() {
  return 5;
}

describe('Dummy Function', function () {
  it('should return 5', function () {
    const result = dummyFunction();
    expect(result).to.equal(5);
  });
});
