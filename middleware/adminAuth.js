const adminAuth = (req, res, next) => {
  console.log("in admin auth");
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("Unauthorized access");
  }
};

module.exports = { adminAuth };
