// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

app.get('/api/v1/endpoint', (req, res) => {
    res.json({ success: true });
});

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);
// alteração salvador
const { Client } = require('pg');
module.exports = (appp) => {
    appp.get('data/products', (req, res) => {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });

        client.connect();

        client.query(
            'SELECT Id,Name, LastName, Phone FROM salesforce.contact;',
            (err, data) => {
                if (err) console.log(err);
                for (let row of data.rows) {
                    console.log(JSON.stringify(row));
                }
                client.end();
            }
        );

        res.json({ status: 'ok' });
    });
};
