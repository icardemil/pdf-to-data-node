const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
global.appRoot = path.resolve(__dirname);

app.set('port', process.env.SERVER_PORT || 5000);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/api/ocr', require('./routes/ocr'));

const server = app.listen(app.get('port'), () => {
	console.log('Listen on port ', app.get('port'));
});

module.exports = {
	app,
	server,
};
