import db from "../config/db.config.js";
import env from "../config/env.config.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

async function signin(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            const error = new Error("Error user netu");
            error.status = 400;
            throw error;
        }
        const heshingPassword = hashSync(password, 1);
        const [[user]] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            email
        );
        if (user) {
            const error = new Error("Error user uje bo");
            error.status = 401;
            throw error;
        }
        const [{ insertId }] = await db.query(
            "INSERT INTO users ( name, email, password, role ) VALUES (?, ?, ?, ?)",
            [name, email, heshingPassword, "user"]
        );
        const refreshToken = sign(
            { id: insertId, role: "user" },
            env.REFRESH_TOKEN,
            { expiresIn: "240s" }
        );
        const accessToken = sign(
            { id: insertId, role: "user" },
            env.ACCESS_TOKEN,
            { expiresIn: "180s" }
        );
        db.query("UPDATE users SET refresh_token = ? WHERE email = ?", [
            refreshToken,
            email,
        ]);
        res.json({ refreshToken, accessToken });
    } catch (error) {
        res.json({ error: "Error is users none " + error });
    }
}

async function login(req, res) {
    try {
        const { password, email } = req.body;
        if (!password || !email) {
            const err = new Error("Email and passwoprd must be provided");
            err.status = 400;
            throw err;
        }
        const [[user]] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            email
        );
        if (!user) {
            const err = new Error(`User with email ${email} not found`);
            err.status = 404;
            throw err;
        }
        const isPasswordMatches = compareSync(password, user.password);

        if (!isPasswordMatches) {
            const err = new Error("Wrong email or|and password");
            err.status = 404;
            throw err;
        }
        const accessToken = sign(
            { id: user.id, role: user.role },
            env.ACCESS_TOKEN,
            { expiresIn: "60s" }
        );
        const refreshToken = sign(
            { id: user.id, role: user.role },
            env.REFRESH_TOKEN,
            { expiresIn: "180s" }
        );

        res.json({ refreshToken, accessToken });

        const hashedRefreshToken = hashSync(refreshToken, 1);
        db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [
            hashedRefreshToken,
            user.id,
        ]);
    } catch (err) {
        res.json({ error: "Error is users none " + err });
    }
}

async function refresh(req, res) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            const err = new Error("Wrong refreshToken");
            err.status = 404;
            throw err;
        }
        const { id, role } = verify(refreshToken, env.REFRESH_TOKEN);
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id);
        const refresh_Token = sign({ id, role }, env.REFRESH_TOKEN, {
            expiresIn: "240s",
        });
        db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [
            refresh_Token,
            id,
        ]);
        res.json(user);
    } catch (error) {
        res.json({ error: "Error is users none " + error.message });
    }
}

async function logout(req, res) {
    try {
        db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [
            null,
            req.id,
        ]);
        res.json("okk");
    } catch (error) {
        res.json({ error: "user is " + error.message });
    }
}

export { login, signin, refresh, logout };
