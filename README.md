# mysql.ts

A simple node.js MySQL wrapper made with TypeScript.

**This package is still in development!**

## Installation

### npm

```bash
npm i mysql.ts
```

### Yarn

```bash
yarn add mysql.ts
```

## Usage

```ts
import { createConnection } from "mysql.ts";

async function init() {
  const connection = await createConnection({
    /* options */
  });

  // query something
  const results = await connection.query.select(["id", "name"]).from("books").exec();

  console.log(results);
}
```
