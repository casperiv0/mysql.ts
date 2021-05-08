# mysql.ts

[![npm][npm_url_img]][npm_url]
![size][size_url]
![license][license_url]
[![maintained][maintained_url]][github_url]

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

## TypeScript support

```ts
interface MyData {
  id: string;
  fist_name: string;
  last_name: string;
}

const connection = await createConnection({
  /* ... */
});

const books = await connection
  .query<MyData>()
  // will have types!
  .select(["last_name", "fist_name"])
  .from("books")
  // will have types!
  .where("last_name", "hello")
  // will have types!
  .order("last_name", "ASC")
  .exec();
```

_This is not a full list of methods. Check the docs for a full list!_

## Documentation

[Checkout the documentation here](./docs/README.md)

## More

- [Query](./Query.md)
- [Connection](./Connection.md)

## Example

You view [check an example here](https://github.com/Dev-CasperTheGhost/mysql.ts-example)

[size_url]: https://img.shields.io/bundlephobia/min/@casper124578/mysql.ts/latest
[license_url]: https://img.shields.io/github/license/dev-caspertheghost/mysql.ts
[maintained_url]: https://img.shields.io/badge/maintained-yes-green
[npm_url]: https://npmjs.org/@casper124578/mysql.ts
[npm_url_img]: https://img.shields.io/npm/v/@casper124578/mysql.ts
[github_url]: https://github.com/dev-caspertheghost/mysql.ts
