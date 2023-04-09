const express = require('express');
const config = require('./config/config.json');
const home = require('./routes/home');
const cards = require('./routes/cards');
const about = require('./routes/about');
const api = require('./routes/api');

/** ***************************************************
 * Define some constants and variables
 *************************************************** */

const app = express();

/** ***************************************************
 * Middleware
 *************************************************** */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** ***************************************************
 * Set template engine
 *************************************************** */
app.set('view engine', 'ejs');

/** ***************************************************
 * Routes
 *************************************************** */
app.use('/', home);
app.use('/cards', cards);
app.use('/about', about);
app.use('/api', api);

/** ***************************************************
 * If no routes give response, show 404 Page
 *************************************************** */

app.use((req, res) => {
    res.status(404).render('404', { strategy: '' });
});

/** ***************************************************
 * Start webserver
 *************************************************** */

app.listen(config.port, () => {
    console.log('==================================================\n\n');
    console.log(`Webserver running on http://localhost:${config.port}\n\n`);
    console.log('==================================================\n\n');
});
