module.exports = class HttpsError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}