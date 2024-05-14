# ZeroSSL Client
Unofficial Node.js client for the [ZeroSSL API](https://zerossl.com/documentation/api/)

![NPM Version](https://img.shields.io/npm/v/zerossl-client)
![npm bundle size](https://img.shields.io/bundlephobia/min/zerossl-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- Easy management of SSL certificates.
- Straightforward integration with the ZeroSSL API.
- Supports all key operations such as creating, revoking, and getting the status of certificates.

## Installation

```bash
npm install zerossl-client
yarn add zerossl-client
pnpm install zerossl-client
```

## Usage

To use the Zero SSL Client, you need to instantiate it with your ZeroSSL API token. Here is a basic example:

```javascript
import {ZeroSSL} from 'zerossl-client';
const client = new ZeroSSL('your-api-token');

// Generating a new CSR
const csr = await client.generateCsr({
  common_name: "example.com",
  organization: "Example Inc",
  organizational_unit: "IT",
  locality: "San Francisco",
  state: "California",
  country: "US",
  email: "jhon.doe@example.com",
});

// Creating a new SSL certificate
await client.createCertificate({ 
  certificate_domains: "example.com",
  certificate_csr: csr,
});
```

# Disclaimer
This library is a community open source project. There is no connection with ZeroSSL or Stack Holdings GmbH. The term ZeroSSL/zerossl is recognised as ZeroSSL™, a trademark of Stack Holdings GmbH in the USA, EU & UK and this library is provided in good faith as a community open source project.