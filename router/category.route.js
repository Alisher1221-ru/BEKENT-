import { Router } from "express";

let categoryRoute = Router()

categoryRoute.post('/', (req, res) => {
    const query = req.query
    const body = req.body
    res.send({...body, ...query})
})

export default categoryRoute