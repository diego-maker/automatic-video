import express from 'express';
import bodyParser from 'body-parser';
import webHookrouter from '../routes/webhook.js'

const app = express();

app.use(bodyParser.json());
app.use('/webhook', webHookrouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Speech tto text listening in port ${port}` ))