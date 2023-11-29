import jwt from 'jsonwebtoken'
import env from '../config/env.config.js'

function authGard(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const payload = jwt.verify(token, env.ACCESS_TOKEN)
    req.id = payload.id
    req.role = payload.role
    next()
  } catch (error) {
    res.status(error.status || 402).json({error: "JWT error: " + error.message})
  }
}
export default authGard