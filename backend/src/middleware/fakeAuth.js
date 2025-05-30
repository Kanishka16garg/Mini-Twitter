module.exports = (req, res, next) => {
  req.user = { name: "TestUser" };
  next();
};