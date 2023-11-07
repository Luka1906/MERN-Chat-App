const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

module.exports.register = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(6)
      .max(20)
      .required(),
    email: Joi.string()
      .min(3)
      .max(50)
      .required()
      .email(),
    password: Joi.string().pattern(
      new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
    ),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(403).send(error.details[0].message);

  const userNameCheck = await User.findOne({ username: req.body.username });
  const emailCheck = await User.findOne({ email: req.body.email });

  if (userNameCheck)
    return res
      .status(409)
      .json({ msg: "User with the same username already exist!" });

  if (emailCheck)
    return res
      .status(409)
      .json({ msg: "User with the same email already exist!" });

  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: passHash,
    });
    delete newUser.password;

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.login = async (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string()
        .min(6)
        .max(20)
        .required(),
      password: Joi.string().pattern(
        new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      ),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) return res.status(403).send(error.details[0].message);
  
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
  
      if (!user)
        return res
          .status(400)
          .json({ msg: "User and/or password are not ok. Try again!" });
  
      const isMatched = await bcrypt.compare(password, user.password);
      console.log(isMatched);
  
      if (!isMatched)
        return res
          .status(400)
          .json({ msg: "User and/or password are not ok. Try again!" });
  
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports.setAvatar = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { avatar } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(id, {
        isAvatarImageSet: true,
        avatarImage: avatar,
      }, {new: true});
      updatedUser.save()
      console.log (updatedUser)
     
        res.status(200).json({
          isSet: updatedUser.isAvatarImageSet,
          image: updatedUser.avatarImage,
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "id",
      ]);
  
      res.status(200).json({ users });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  