class NotImplementedException extends Error {
    constructor() {
      super("Not Implemented Exception")
    }
  }
  
  class Base {
    isConnected() {
      throw new NotImplementedException()
    }
  
    connect() {
      throw new NotImplementedException()
    }
  }
  
  module.exports = Base
  