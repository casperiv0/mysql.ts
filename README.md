# mysql.ts

![size](https://img.shields.io/bundlephobia/min/@casper124578/mysql.ts/latest)
![license](https://img.shields.io/github/license/dev-caspertheghost/mysql.ts)
![maintained](https://img.shields.io/badge/maintained-yes-green)

A simple node.js MySQL wrapper made with TypeScript.

## Installation

### npm

```bash
npm i @casper124578/mysql.ts
```

### Yarn

```bash
yarn add @casper124578/mysql.ts
```

## Usage

```ts
import { createConnection } from "@casper124578/mysql.ts";

async function init() {
  const connection = await createConnection({
    /* options */
  });

  // query something
  const results = await connection.query().select(["id", "name"]).from("books").exec();

  console.log(results);
}
```

## Documentation

[You can check the documentation here](https://github.com/Dev-CasperTheGhost/mysql.ts/tree/main/docs)
