class Error {
    public readonly message: string | string[] | object;

    public readonly statusCode: number;

    constructor(message: string | string[] | object, statusCode = 400) {
      this.message = message;
      this.statusCode = statusCode;
    }
}

export default Error;