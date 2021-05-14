# Builder types

See supported types bellow

- [`string`](#string)
- [`int`](#int)
- [`text`](#text)
- [`date`](#date)
- [`json`](#json)
- [`timestamp`](#timestamp)
- [`customType`](#customtype)

## Usage

```ts
import { createConnection, string, int, text } from "@casper124578/mysql.ts";

const connection = await createConnection({
  /* options */
});

connection.query().createTableIfNotExists("books", "id", {
  id: string({ nullable: false }),
  name: string({ nullable: false }),

  // default is `true` for nullable
  author: string({ nullable: true }),
  description: text({}),
});
```

## customType

We export a function to create your own type:

```ts
import { customType, BuilderTypeOptions } from "@casper124578/mysql.ts";

const myType = customType("BOOLEAN", { nullable: false });

// OR

const myType = <T = string>(options: BuilderTypeOptions<T>) => {
  return customType("BOOLEAN", options);
};
```

---

[Return to README](./README.md)
