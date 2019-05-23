module.exports = (app, rest, partials) => {

  //create connection
  // var db = mysql.createConnection({
  //   host     : 'localhost',
  //   user     : 'root',
  //   password : "12345678",
  //   database : "healthassist",
  //   port      : 3306
  // });
  //
  // db.connect(function(err) {
  //   if (err) throw err;
  // });

  app.get('/api_list', async (req, res) => {
    try {
      console.log("inside api list view");

      // db.query("SELECT * FROM customers", function (err, result, fields) {
      //   if (err) throw err;
      //   console.log(result);
      // });

      rest.get('https://jsonplaceholder.typicode.com/users').on('complete', function(result) {
      if (result instanceof Error) {
          console.log('Error:', result.message);
          // this.retry(5000); // try again after 5 sec
          return res.status(500).send({ "status": "error", "message": "REST API CALL ERROR" })
        } else {
          // console.log(result);
          res.locals.allapi = result;
          return res.render('api_list.html', {
            partials
          });
        }
      });


    } catch (error) {
      console.log(error)
      return res.status(500).send({ "status": "error", "message": "Yikes, something went wrong!" })
    }
  });


  app.get('/api_details', async (req, res) => {
    try {
      console.log("inside api details view");
      console.log(req.query);

      const id = req.query.id

      rest.get('https://jsonplaceholder.typicode.com/posts/'+id).on('complete', function(result) {
      if (result instanceof Error) {
          console.log('Error:', result.message);
          // this.retry(5000); // try again after 5 sec
          return res.status(500).send({ "status": "error", "message": "REST API CALL ERROR" })
        } else {
          // console.log(result);
          res.locals.isSave = false;
          res.locals.api_detail = result.title;
          res.locals.api_name = result.title;
          res.locals.api_proxy = result.title;
          res.locals.api_end_point = result.title;
          res.locals.api_apigee_end_point = result.title;
          res.locals.api_edp_end_point = result.title;
          return res.render('api_details.html', {
            partials
          });
        }
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ "status": "error", "message": "Yikes, something went wrong!" })
    }
  });


  app.get('/new_api', async (req, res) => {
    try {
      console.log("inside api create view");

      res.locals.isSave = true;
      return res.render('api_details.html', {
        partials
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ "status": "error", "message": "Yikes, something went wrong!" })
    }
  });

}
