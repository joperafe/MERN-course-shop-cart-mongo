import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token = "blablabla";

  console.log(req.headers.authorization);

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);
      next();
    } catch (error) {}
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  } else {
    // throw new
  }
});

export { protect };
