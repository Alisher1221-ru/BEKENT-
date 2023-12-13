import express from 'express'
import env from './config/env.config.js'
import authRoute from './router/auth.router.js'
import categoryRoute from './router/category.route.js'
import userRoute from './router/user.route.js'
import routerProduct from './router/product.router.js'
import uzumServers from './router/uzum.router.js'

let port = env.PORT

let appServer = express()

appServer.use(express.json())
appServer.use('/category', categoryRoute)
appServer.use('/user', userRoute)
appServer.use('/auth', authRoute)
appServer.use('/product', routerProduct)
appServer.use('/uzum', uzumServers)

function Admin(req, res, next) {
    let id = +req.params.id
    if (isNaN(id)) {
        return res.send('Error')
    }
    if (Math.floor(id) !== id) {
        return res.send('Error')
    }
    next()
}

appServer.post('/:id', Admin, (req,res) => {
    res.send(req.params.id)
})

appServer.patch('/:id', (req, res) => {
    const params = req.params
    const body = req.body
    res.send({params, body})
})

appServer.delete('/:id', (req, res) => {
    const params = req.params
    res.send({params, "причина":"я ушел"})
})

appServer.listen(port, () => console.log("run port "+port))

