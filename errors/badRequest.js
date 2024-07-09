customError = require("./customerror")
const { StatusCodes} = require("http-status-codes")

class badRequest extends customError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.BAD_GATEWAY
    }
    
}
module.exports = badRequest;