module.exports = {
  index(req, res, next) {
    res.render("static/index", { title: "Welcome to Bloccit" });
  }
};

//controller handles a request for a particular resource.
