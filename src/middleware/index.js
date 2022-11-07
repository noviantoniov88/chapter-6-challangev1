const jwt = require("jsonwebtoken");
const { addHours, isAfter } = require("date-fns");

/**
 * Access token checker flow
 * - Get access token from request headers
 * - Verifikasi access token menggunakan module jsonwebtoken
 * - Is token still valid?
 * - Valid ? go next
 */
module.exports = {
  isAuthenticated: (req, res, next) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(404).json({ error: "Page not found" });

    }

    try {
      const isVerified = jwt.verify(accessToken, process.env.JWT_SECRET);
      if (!isVerified) {
        // return res.status(404).json({ error: "Page not found" });
        res.redirect("/login");
      }

      req.session = jwt.decode(accessToken);

      // Check expired token
      const currentHour = Date.now();
      const accessTokenExpiredAt = addHours(req.session.loggedInAt, 1);
      if (isAfter(currentHour, accessTokenExpiredAt)) {
        // return res.status(404).json({ error: "Access token has expired." });
        res.redirect("/login");
      }

      next();
    } catch (error) {
      req.log.error(error);
      return res.status(404).json({ error: "Page not found" });
    }
  },
};
