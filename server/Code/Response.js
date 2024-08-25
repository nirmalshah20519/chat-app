class Response {
    // constructor() {
    //     // Constructor can be extended to include more properties if needed
    // }

    // Generates a success response
    static success(message, data = {}, token = null) {
        const response = {
            code: 200,
            message: message,
            data: data
        };
        if (token) {
            response.token = token;
        }
        return response;
    }

    // Generates an error response
    static error(message, code = 400) {
        return {
            code: code,
            message: message
        };
    }

    // Can add more methods for other types of responses (e.g., not found, unauthorized)
    static notFound(message = "Resource not found") {
        return {
            code: 404,
            message: message
        };
    }

    static unauthorized(message = "Unauthorized access") {
        return {
            code: 401,
            message: message
        };
    }
}

export default Response;
