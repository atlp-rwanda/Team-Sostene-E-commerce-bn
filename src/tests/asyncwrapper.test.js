import chai, { expect } from 'chai';
import { asyncWrapper } from '../helpers';

chai.should();

describe('Testing Async Wrapper Error Handling', function () {
  it('Should return error 500', async function () {
    const req = {};
    const res = {
      status: (statusCode) => ({
        json: (response) => {
          expect(statusCode).to.equal(500);
          expect(response.message).to.equal('Internal Server Error');
        },
      }),
    };
    await asyncWrapper(() => {
      throw error;
    })(req, res);
  });
});
