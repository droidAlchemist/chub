module.exports = (app, rest, partials) => {
  app.get('/', async (req, res) => {
    try {
      console.log("inside home view");
      return res.render('index.html', {
        partials
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ "status": "error", "message": "Yikes, something went wrong!" })
    }
  })

  require('./page')(app, rest, partials)
}
