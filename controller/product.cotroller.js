import db from "../config/db.config.js";
import apiResponse from "../helpers/apiResponse.js";
import Pagination from "../middleware/poginetion.guard.js";

async function postProduct(req, res) {
    try {
        const { name, price, title } = req.body;
        if (!name || !price || !title) {
            const error = new Error("error product");
            error.status(400);
            throw error;
        }
        const [[product]] = await db.query(
            "SELECT * FROM product WHERE name = ?",
            name
        );
        if (product) {
            const error = new Error("error product");
            error.status = 400
            throw error;
        }
        db.query("INSERT INTO product (name, price, title) VALUES (?, ?, ?)", [
            name,
            price,
            title,
        ]);
        apiResponse(res).send(product);
    } catch (error) {
        res.json({ error: error.message });
    }
}

async function getProduct(req, res) {
    try {
        const [[list]] = await db.query("SELECT COUNT(id) FROM product");
        const count = list["COUNT(id)"];
        const pogination = new Pagination(
            count,
            +req.query.page,
            +req.query.limit
        );
        const [product] = await db.query(
            "SELECT * FROM product LIMIT ? OFFSET ?",
            [pogination.limit, pogination.offset]
        );
        if (!product) {
            const error = new Error("error product");
            error.status = 400
            throw error;
        }
        apiResponse(res).send(product, pogination);
    } catch (error) {
        apiResponse(res).error(error.message, error.status);
    }
}

export { getProduct, postProduct };
