const express = require('express');
const proxyServer = require('http-route-proxy');

const app = express();

app.use(
  '/',
  proxyServer.connect({
    to: 'http://esxvm002:8080/Reporting/action/',
    https: true,
    route: ['/']
  })
);

app.listen(9999, '0.0.0.0');
console.log('Listening on localhost: 9999');
