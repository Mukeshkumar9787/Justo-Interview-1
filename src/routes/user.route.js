import { Router } from "express";
import { getConnection } from "../db/connection.js";
import { formatDateString, generationToken } from "../utils/helper.js";
import { ONE_TIME_LINK_EXPIRE_MINS } from "../config/config.js";
import verifyToken from "../middleware/auth.js";

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
  let connection;
  try {
    const { username, password } = await req.body;
    if (!username) {
      return res
        .status(400)
        .json({ status: 400, message: "Username is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ status: 400, message: "Password is required" });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ status: 400, message: "Password should be Min Length 5" });
    }
    connection = await getConnection();
    const [data] = await connection.execute(
      `SELECT * FROM USER WHERE mobile='${username}' OR email='${username}'`
    );
    if (data.length == 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Username not Exist" });
    }
    if (data[0].password != password) {
      return res
        .status(401)
        .json({ status: 401, message: "Incorrect Password" });
    }
    let token = generationToken({
      username,
    });
    return res
      .status(200)
      .json({ status: 200, message: "Login Successfull", token });
  } catch (error) {
    console.error(error);
  }
});

userRouter.post("/generateLink", async (req, res) => {
  try {
    const { username, password } = await req.body;
    if (!username) {
      return res
        .status(400)
        .json({ status: 400, message: "Username is required" });
    }
    let connection = await getConnection();

    const [data] = await connection.execute(
      `SELECT * FROM USER WHERE mobile='${username}' OR email='${username}'`
    );
    if (data.length == 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Username not Exist" });
    }
    let date = new Date();
    date.setMinutes(date.getMinutes() + ONE_TIME_LINK_EXPIRE_MINS);
    const link = `${new Date().getTime()}_${username}`;
    await connection.execute(`INSERT INTO OneTimeLink (username,link, isVerfied, expiresAt) VALUES ('${username}','${link}', 0,
      '${formatDateString(date)}')`);
    res.json({
      statusCode: 0,
      link: `http://localhost:${process.env.PORT}/user/verifyOneTimeLink/${link}`,
    });
  } catch (error) {
    console.error(error);
  }
});

userRouter.get("/verifyOneTimeLink/:link", async (req, res) => {
  try {
    const { link } = req.params;
    let connection = await getConnection();

    const [data] = await connection.execute(
      `SELECT * FROM OneTimeLink WHERE link='${link}'`
    );

    if (data.length == 0) {
      return res.status(404).json({ status: 404, message: "Link not Exist" });
    }

    let linkData = data[0];

    if (formatDateString(new Date()) > new Date(linkData.expiresAt)) {
      return res.status(410).json({ status: 410, message: "Link Expired" });
    }

    if (linkData.isVerfied == 1) {
      return res
        .status(410)
        .json({ status: 404, message: "Link Already Used" });
    }
await connection.execute(`
      UPDATE OneTimeLink SET isVerfied = 1 WHERE (link='${link}');
      `
    );
    res.json({
      statusCode: 0,
      token: generationToken({ username: linkData.username }),
    });
  } catch (error) {
    console.error(error);
  }
});

userRouter.get("/getTime", verifyToken, async (req, res) => {
  try {
    res.json({ statusCode: 0, time: new Date() });
  } catch (error) {
    console.error(error);
  }
});

userRouter.post("/kickOff", async (req, res) => {
  try {
    const { username } = await req.body;

    if (!username) {
      return res
        .status(400)
        .json({ status: 400, message: "Username is required" });
    }

    let connection = await getConnection();

    const [data] = await connection.execute(
      `SELECT * FROM USER WHERE mobile='${username}' OR email='${username}'`
    );
    if (data.length == 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Username not Exist" });
    }

    await connection.execute(`
      UPDATE user SET tokenRevokeTime = NOW() WHERE (mobile='${username}' OR email='${username}');
      `
    );

    res.json({ statusCode: 0, message: `Token Revoked Sucessfully For ${username}` });
  } catch (error) {
    console.error(error);
  }
});

export default userRouter;
