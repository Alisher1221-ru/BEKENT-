import db from "../config/db.config.js"
import Pagination from "../middleware/poginetion.guard.js";

async function postProduct(req, res) {
    try {
        const { name, price, title } = req.body;
        if (!name||!price||!title) {
            const error = new Error('error product')
            error.status(400)
            throw error
        }
        const [[product]] = await db.query("SELECT * FROM product WHERE name = ?", name)
        if (product) {
            const error = new Error('error product')
            error.status(400)
            throw error
        }
        db.query("INSERT INTO product (name, price, title) VALUES (?, ?, ?)", [name, price, title])
        res.json('good')
    } catch (error) {
        res.json({ error: "Error is product none " + error });
    }
}


async function getProduct(req,res) {
    try {
        const [[list]] = await db.query("SELECT COUNT(id) FROM product")
        const count = list["COUNT(id)"]
        const pogination = new Pagination(count,+req.query.page,+req.query.limit)
        const [product] = await db.query("SELECT * FROM product LIMIT ? OFFSET ?", [pogination.limit,pogination.offset])
        if (!product) {
            const error = new Error('error product')
            error.status(400)
            throw error
        }
        res.json({product, currentPage: pogination.page, totalPages: pogination.totalPages})
    } catch (error) {
        res.json({error: error.message})
    }
}

export {
    getProduct,
    postProduct
}