import User from "../models/user.model.js";

export const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.send({ name, email, password });
};
