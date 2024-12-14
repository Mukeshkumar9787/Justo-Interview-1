import jwt from "jsonwebtoken";
import { getConnection } from "../db/connection.js";
import { formatDateString } from "../utils/helper.js";

export default async function verifyToken(req, res, next) {
  const JWT_SECRET = process.env.JWT_SECRET_KEY;
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    let { username, iat } = jwt.decode(token, JWT_SECRET);
    let connection = await getConnection();
    const [data] = await connection.execute(
      `SELECT * FROM USER WHERE mobile='${username}' OR email='${username}'`
    );

    console.log(formatDateString(new Date(iat * 1000)))
    console.log((data[0]?.tokenRevokeTime), 'token')

    if (data.length == 0 || (formatDateString(new Date(iat * 1000)) < (formatDateString(data[0]?.tokenRevokeTime)))) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
