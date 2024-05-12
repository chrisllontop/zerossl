# ZeroSSL Client
Unofficial Node.js client for the [ZeroSSL API](https://zerossl.com/documentation/api/)

[![npm version](https://badge.fury.io/js/zerossl-client.svg)](https://badge.fury.io/js/zerossl-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- Easy management of SSL certificates.
- Straightforward integration with the ZeroSSL API.
- Supports all key operations such as creating, revoking, and getting the status of certificates.

## Installation

```bash
npm install zerossl-client
yarn install zerossl-client
pnpm install zerossl-client
```

## Usage

To use the Zero SSL Client, you need to instantiate it with your ZeroSSL API token. Here is a basic example:

```javascript
import {ZeroSSL} from 'zerossl-client';
const client = new ZeroSSL('your-api-token');

// Example usage: Creating a new SSL certificate
await client.createCertificate({ 
  domains: ["example.com"],
  validity_days: 90,
  csr: "<your-csr>",
  acme_method: "HTTP_CSR_HASH"
});
```

# Disclaimer
This library is a community open source project. There is no connection with ZeroSSL or Stack Holdings GmbH. The term ZeroSSL/zerossl is recognised as ZeroSSL™, a trademark of Stack Holdings GmbH in the USA, EU & UK and this library is provided in good faith as a community open source project.