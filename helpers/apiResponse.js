function apiResponse(res) {
    return {
        send(data, pogination) {
            res.json({
                data,
                error: null,
                pogination,
                page: new Date()
            });
        },
        error(message, status) {
            res.status(status).json({ data: null, message, pogination: null, date: new Date });
        },
    };
}

export default apiResponse;
