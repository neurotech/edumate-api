'use strict';

var tls = require('tls');
var constants = require('constants');

// Disable client session renegotiation, no known use case per:
//   https://www.ssllabs.com/downloads/SSL_TLS_Deployment_Best_Practices_1.3.pdf
// By virtue of require() caching, this will affect all code using `tls`.
tls.CLIENT_RENEG_LIMIT = 0;

// Based on whitelist proposed at: https://bugs.ruby-lang.org/issues/9424
// And SSL/TLS Best Practices: https://www.ssllabs.com/downloads/SSL_TLS_Deployment_Best_Practices_1.3.pdf
// Node v0.10.x doesn't support ECDH ciphers, but this list allows them when
//   upgrading to v0.12.
var allowed_ciphers = 'ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:' +
                      'DH+AES:RSA+AES:!aNULL:!MD5:!DSS';

// Pass this object to `tls.createServer` or `https.createServer` after
// adding your key/cert/ca (http://nodejs.org/api/tls.html#tls_tls_connect_options_callback).
module.exports = {
  // Restrict ciphers.
  ciphers: allowed_ciphers,

  // When enabled, server chooses cipher, not client.
  honorCipherOrder: true,

  // Disable SSLv2 and SSLv3. SSLv3 is vulnerable to POODLE exploit.
  //   http://www.troyhunt.com/2014/10/everything-you-need-to-know-about.html
  //   https://gist.github.com/3rd-Eden/715522f6950044da45d8
  secureOptions: constants.SSL_OP_NO_SSLv2 | constants.SSL_OP_NO_SSLv3
};
