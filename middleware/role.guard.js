function userGuard(...role) {
    return function (req, res, next) {
        try {
            if (role.includes(req.role)) {
                next();
                return;
            }
            res.json('no')
        } catch (error) {
            res.json({ error: "message is" + error.message });
        }
    };
}

export default userGuard;
