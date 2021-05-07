# Documentation

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

#### Methods with types

- `select`
- `insert`
- `update`
- `where`
- `order`
- `and`

## More

- [Query](./Query.md)
- [Connection](./Connection.md)

## Example

You view [check an example here](https://github.com/Dev-CasperTheGhost/mysql.ts-example)
