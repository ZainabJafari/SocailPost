import { db } from "../connect.js";

export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id=?";

    db.query(q, [userId], (err, data) => {
        if (err) {
            console.error(err);  
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            console.log(`User with ID: ${userId} not found`); 
            return res.status(404).json({ message: "User not found" });
        }
        
        const { password, ...info } = data[0];
        return res.status(200).json(info);
    });
};
