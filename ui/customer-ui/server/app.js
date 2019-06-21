// import 'zone.js/dist/zone-node';
// import 'reflect-metadata';
// import {enableProdMode} from '@angular/core';
// Express Engine
// import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
// import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

// import * as express from 'express';
// import {join} from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
// enableProdMode();

// Express server
const express = require('express');
const app = express();
const http = require('http');

const PORT = process.env.PORT || 4200;
const DIST_FOLDER = __dirname + '/../dist/customer-ui';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
// const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));
const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
app.engine('html', ngExpressEngine({
  //bootstrap: ServerAppModule // Give it a module to bootstrap
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);
app.use(express.static(DIST_FOLDER));

app.get('/api/test/example', (req, res) => {
  http.get('http://localhost:8080/api/test/example', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data));
      res.json(JSON.parse(data)).end();

    });
  });
});

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Server static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});


