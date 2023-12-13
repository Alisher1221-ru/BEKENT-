import db from "../config/db.config.js"

async function createUsers(req, res) {
    try {
        const {username, firstname, refresh_token, email, phone} = req.doby
        if (!username || !firstname || !refresh_token || !email || !phone) {
            const error = "error is "
            error.status = 404
            throw error
        }
        db.query("INSERT INTO (username, firsname, refresh_token, email, phone) users VALUES (?,?,?,?,?)",[username, firstname, refresh_token, email, phone])
        res.json('as')
    } catch (error) {
        res.status(401).json('error is '+ error.message)
    }
}

export {
    createUsers
}