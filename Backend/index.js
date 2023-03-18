const express = require('express');
const { use } = require('express/lib/application');
const app = express();
const cors = require('cors');
const path = require('path')

//Settings
app.set('port', process.env.PORT || 9000);

//Middlewares
app.use(express.static(path.join(__dirname,'dbimages')));
app.use(express.json());
app.use(cors());


//Routes
app.use(require('./routes/consultas'));

//Starting the server
app.listen(9000, () => {
    console.log('Server on port', app.get('port'));
});