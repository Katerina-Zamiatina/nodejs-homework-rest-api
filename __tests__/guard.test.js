const { guard } = require('../src/helpers/guard');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

describe('Guard service test', () => {
  it('should call next() and add user&token properties to req obj', () => {
    const user = {
      _id: '1',
    };
    const token = jwt.sign({ _id: user._id }, SECRET_KEY);

    const mockReq = {
      headers: { authorization: `Bearer ${token}` },
    };
    const mockRes = {};
    const mockNext = jest.fn();
    guard(mockReq, mockRes, mockNext);

    expect(mockReq.token).toEqual(token);
    expect(mockReq.user._id).toEqual(user._id);
    expect(mockNext).toHaveBeenCalled()
  });
});
