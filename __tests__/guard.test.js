const { guard } = require('../src/helpers/guard');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { NotAuthorizedError } = require('../src/helpers/errors');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

describe('Guard service test', () => {
  it('should call next() and add user&token properties to req obj', async () => {
    const user = {
      _id: '1',
    };
    const token = jwt.sign({ _id: user._id }, SECRET_KEY);

    const mReq = {
      headers: { authorization: `Bearer ${token}` },
    };
    const mRes = {};
    const mockNext = jest.fn();
    guard(mReq, mRes, mockNext);

    await expect(mReq.token).toEqual(token);
    expect(mReq.user._id).toEqual(user._id);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should call next() with error in case auth header is absent', async () => {
    const mReq = {
      headers: {},
    };
    const mRes = {};
    const mockNext = jest.fn();

    guard(mReq, mRes, mockNext);

    await expect(mockNext).toHaveBeenCalled(
      new NotAuthorizedError('Please, provide a token in request auth header'),
    );
  });
});
