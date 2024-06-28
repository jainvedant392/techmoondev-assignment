import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";
const users = new Map([
    ["jainvedant392", {username: "jainvedant392", password: bcrypt.hashSync("Vedantjain@123", 8)}]
]);

export default async function handler(req: NextApiRequest, resp: NextApiResponse) {
    if (req.method === "POST") {
        const {username, password} = req.body;
        if(users.has(username)) {
            const user = users.get(username);
            // Check if user is not undefined before proceeding
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({username: user.username}, SECRET_KEY, {expiresIn: "1h"});
                resp.status(200).json({username, token});
            } else {
                resp.status(401).json({message: "Invalid password"});
            }
        } else {
            resp.status(404).json({message: "User not found"});
        }
    } else {
        resp.status(405).json({message: "Method not allowed"});
    }
}