const topicQueries = require("../db/queries.advertisements.js");

module.exports = {
  index(req, res, next) {
    topicQueries.getAllAdvertisements((err, advertisements) => {
      if (err) {
        res.redirect(500, "static/index");
      } else {
        res.render("advertisements/index", { advertisements });
      }
    });
  }
};
