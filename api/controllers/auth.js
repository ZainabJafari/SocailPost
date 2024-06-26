import { db } from "../connect.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    //CHECK USER IF EXISTS
  
    const q = "SELECT * FROM users WHERE username = ?";
  
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");
      //CREATE A NEW USER
      //Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  
      const q =
        "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";
  
      const values = [
        req.body.username,
        req.body.email,
        hashedPassword,
        req.body.name,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
  };


export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (data.length === 0) return res.status(404).json({ message: "User not found" });

    const user = data[0];
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, "secretkey");
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json(user);
  });
};

  



export const logout = (req, res) => {

    res.clearCookie("accessToken", {
        secure: true,
        sameSite: 'none'
    }).status(200).json("user has been logged out")
}