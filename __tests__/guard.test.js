const { guard } = require('../src/helpers/guard');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { NotAuthorizedError } = require('../src/helpers/errors');
const userService = require('../src/services/userService.js');

jest.mock('../src/services/userService.js');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

describe('Guard service test', () => {
  const user = {
    _id: '1',
  };

  const findUserByTokenRes = () => user;

  userService.findUserByToken.mockImplementation(findUserByTokenRes);

  it('should call next() and add user&token properties to req obj', async () => {
    const token = jwt.sign({ _id: user._id }, SECRET_KEY);

    const mReq = {
      headers: { authorization: `Bearer ${token}` },
    };

    const mRes = {};

    const mockNext = jest.fn();
    await guard(mReq, mRes, mockNext);

    expect(mReq.token).toEqual(token);
    expect(mReq.user._id).toEqual(user._id);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should call next() with error in case auth header is absent', async () => {
    const mReq = {
      headers: {},
    };
    const mRes = {};
    const mockNext = jest.fn();

    await guard(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      new NotAuthorizedError('Please, provide token'),
    );
  });
  it('should call next() with error in case token is invalid', async () => {
    const token = jwt.sign({ _id: user._id }, 'SECRET');

    const mReq = {
      headers: { authorization: `Bearer ${token}` },
    };

    const mRes = {};

    const mockNext = jest.fn();
    await guard(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      new NotAuthorizedError('Invalid token'),
    );
  });
});
