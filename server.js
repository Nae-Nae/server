var express = require('express');
    // wine = require('./routes/wines');
	 // crm = require('./models/models');
var modules = require('./module.js');
	
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.post('/addcrm', modules.crm.register);
app.get('/wines', modules.wine.findAll);
app.get('/wines/:id', modules.wine.findById);
app.post('/addwines', modules.wine.addWine);
app.put('/wines/:id', modules.wine.updateWine);
app.delete('/wines/:id', modules.wine.deleteWine);

 
app.listen(3000);
console.log('Listening on port 3000...');