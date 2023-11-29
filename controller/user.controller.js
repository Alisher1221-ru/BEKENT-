import db from "../config/db.config.js"

async function createUser(req, res) {
  try {
    const appQuery = 'INSERT INTO users (name, passwort, email) VALUES (?, ?, ?)'
    const { name, passwort, email } = req.body
    db.query(appQuery, [name, passwort, email])
    res.end()
  } catch (error) {
    res.json('error' + error.message)
  }
}


async function getUser(req, res) {
  try {
    const appQuery = 'SELECT * FROM users'
    const [users] = await db.query(appQuery)
    console.table(users)
    res.json(users)
  } catch (error) {
    res.json('error' + error.message)
  }
}

// rows

async function deleteUser(req, res) {
  try {
    const appQuery = "DELETE FROM users WHERE id=?;"
    const [users, columns] = await db.query(appQuery, [req.params.id])
    res.send(users)
  } catch (error) {
    console.error(error);
    res.end()
  }
}


async function updateUser(req,res) {
  try {
    const id = req.params.id
    const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id)
    if (!user) {
      const err = new Error(`error is ${id}`)
      err.status = 404
      throw err
    }
    const appQuery = 'UPDATE users SET name = ?, age = ?, tel = ? WHERE id = ?'
    db.query(appQuery, [req.body.name || user.name, req.body.age || user.age, req.body.tel || user.tel, req.params.id])
    res.send("users")
  } catch (err) {
    console.log(err);
    res.json(err.message)
  }
}

export {
  createUser,
  updateUser,
  deleteUser,
  getUser
}
