class ErrorHandler extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ErrorHandler {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongIdError extends ErrorHandler {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends ErrorHandler {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  ErrorHandler,
  ValidationError,
  WrongIdError,
  NotAuthorizedError,
};
