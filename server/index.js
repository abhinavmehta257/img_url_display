const express = require('express');
const {engine} = require('express-handlebars');
const cloudinary = require('cloudinary');
var xml = require('xml');
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//express handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
const path = require('path');


const homePath = path.join(__dirname, '../public');

//home page
app.use(express.static(homePath));

app.post('/getLinks', (req, res) => {
  console.log(req.body);
    cloudinary.config({
        cloud_name: req.body.cloud_name,
        api_key: req.body.api_key,
        api_secret: req.body.api_secret,
        secure: true
       });
       
       url_list = cloudinary.v2.search.expression(
         `folder:${req.body.folder_name}`
        ).sort_by('public_id','desc').execute().then(result=>{ 
          url_list = result.resources;
          rate_limit_allowed = result.rate_limit_allowed;
          rate_limit_reset_at = result.rate_limit_reset_at;
          rate_limit_remaining = result.rate_limit_remaining;
          folder = req.body.folder_name;
          // console.log(result);
          return res.render('index',{url_list,folder,rate_limit_allowed,rate_limit_reset_at,rate_limit_remaining});
          // return res.json(result);
        }).catch(err=>{return res.send(err.error)})
});

app.post('/getLinks/vahana', (req, res) => {
  console.log(req.body);
    cloudinary.config({
        cloud_name: req.body.cloud_name,
        api_key: req.body.api_key,
        api_secret: req.body.api_secret,
        secure: true
       });
       
       url_list = cloudinary.v2.search.expression(
         `folder:${req.body.folder_name}`
        ).sort_by('public_id','desc').execute().then(result=>{ 
          url_list = result.resources;
          rate_limit_allowed = result.rate_limit_allowed;
          rate_limit_reset_at = result.rate_limit_reset_at;
          rate_limit_remaining = result.rate_limit_remaining;
          folder = req.body.folder_name;
          // console.log(result);
          // return res.render('index',{url_list,folder,rate_limit_allowed,rate_limit_reset_at,rate_limit_remaining});
          return res.json(result);
        }).catch(err=>{return res.send(err.error)})
});

app.get('/:id', (req, res) => {
  id = req.params.id;
  res.set('Content-Type', 'text/xml');
  return res.send(xml({id}));
});


app.listen(process.env.PORT||3000, () => {
     console.log('Example app listening on port 3000!');
});
