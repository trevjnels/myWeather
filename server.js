const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3007;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.use('/', express.static(`${__dirname}/../public`));

app.listen(PORT, () => {
	console.log('Server is lightly jogging on port', PORT);
});
