const http = require('http');
const https = require('https');

/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 */

module.exports.getJSON = (options) => {
  const port = options.port == 443 ? https : http;

  return new Promise((resolve, reject) => {
    const req = port.request(options, (res) => {
      res.setEncoding('utf8');
      
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk });
      res.on('end', () => {
        try {
          let parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch(err) {
          console.log('rest::end', err.message);
          reject(err);
        }
      });
    });

    req.on('error', (err) => {
      console.error('rest::request', err.message);
      reject(err);
    });    

    req.end();
  });
};