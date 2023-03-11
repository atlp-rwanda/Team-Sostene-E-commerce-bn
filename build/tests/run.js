"use strict";

var _chai = _interopRequireDefault(require("chai"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const expect = _chai.default.expect;
function dummyFunction() {
  return 5;
}
describe('Dummy Function', () => {
  it('should return 5', () => {
    const result = dummyFunction();
    expect(result).to.equal(5);
  });
});