import jwt from "jsonwebtoken";

export function generationToken(payload) {
  const JWT_SECRET = process.env.JWT_SECRET_KEY;
  let token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return token;
}


export function formatDateString(date){
  const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
  return formattedDate
}