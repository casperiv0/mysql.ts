# Query

## Methods

- [`select`](#select)
- [`from`](#from)
- [`insert`](#insert)
- [`update`](#update)
- [`delete`](#delete)
- [`where`](#where)
- [`whereLike`](#where-like)
- [`and`](#and)
- [`or`](#or)
- [`order`](#order)
- [`limit`](#limit)
- [`raw`](#raw)
- [`renameTable`](#rename-table)
- [`createTable`](#create-table)
- `createTableIfNotExists`
- [`addColumnsToTable`](#add-columns-to-table)
- [`drop`](#drop)
- [`dropColumn`](#drop-column)
- [`count`](#count)
- [`exec`](#exec)
- `having`

## Select

Select `*` (everything), Select 1 item, or select multiple items using an array

```ts
const connection = await createConnection({
  /* ... */
});

const books = await connection.query().select("*").from("books").exec();
const books2 = await connection.query().select(["id", "name"]).from("books").exec();
const books3 = await connection.query().select("id").from("books").exec();
```

[Back to top](#methods)

## From

```ts
const connection = await createConnection({
  /* ... */
});

const books = await connection.query().select("*").from("books").exec();
```

[Back to top](#methods)

## Insert

```ts
const connection = await createConnection({
  /* ... */
});

const data = {
  id: 1,
  name: "book-name",
};

const result = await connection.query().insert("books", data).exec();
```

[Back to top](#methods)

## Update

```ts
const connection = await createConnection({
  /* ... */
});

const data = {
  id: 1,
  name: "book-name",
};

const result = await connection.query().update("books", data).where("id", data.id).exec();
```

[Back to top](#methods)

## Delete

```ts
const connection = await createConnection({
  /* ... */
});

const result = await connection.query().delete("books").where("name", "book-name").exec();
```

[Back to top](#methods)

## Where

```ts
const connection = await createConnection({
  /* ... */
});

const result = await connection.query().select("*").from("books").where("id", "0").exec();
```

[Back to top](#methods)

## Where Like

```ts
const connection = await createConnection({
  /* ... */
});

const result = await connection.query().select("*").from("books").whereLike("name", "%cool%").exec();
```

[Back to top](#methods)

## And

```ts
const connection = await createConnection({
  /* ... */
});

const result = await connection.query().select("*").from("books").where("id", "0").and("name", "my-cool-name").exec();
```

[Back to top](#methods)

## Or

```ts
const connection = await createConnection({
  /* ... */
});

const result = await connection
  .query()
  .select("*")
  .from("books")
  .where("name", "some-name-here")
  .or("name", "my-cool-name")
  .exec();
```

[Back to top](#methods)

## Order

```ts
const connection = await createConnection({
  /* ... */
});

// ASC or DESC
const result = await connection.query().select("*").from("books").order("name", "ASC").exec();
```

[Back to top](#methods)

## Limit

```ts
const connection = await createConnection({
  /* ... */
});

// Max 10 results
const result = await connection.query().select("*").from("books").limit(10).exec();

// Select max 10 results starting from the 5th record
const results2 = await connection.query().select("*").from("books").limit("4, 10").exec();
```

[Back to top](#methods)

## Raw

```ts
const connection = await createConnection({
  /* ... */
});

// Full raw query
const result = await connection.query().raw("SELECT * FROM `books`").exec();

const result = await connection
  .query()
  .raw("INSERT INTO `books` (`id`, `name`) VALUES (?, ?)", ["2", "book-name"])
  .exec();

// With chaining
const result = await connection.query().raw("SELECT * FROM `books`").where("name", "cool-book-name").exec();
```

[Back to top](#methods)

## Rename table

Rename a table

```ts
const connection = await createConnection({
  /* ... */
});

// books = old table name
// cool-books = new table name
const results = await connection.query().renameTable("books", "cool-books").exec();
```

[Back to top](#methods)

## Create table

Create a table

```ts
import { createConnection, string, text, int } from "@casper124578/mysql.ts"

const connection = await createConnection({
  /* ... */
});

// 0th arg = table name
// 1st arg = primary key
// 2nd arg = columns
const results = await connection.query().createTable("books", "id"  {
  id: int({ nullable: false }),
  name: string({ nullable: false, length: 150 }),
  description: text({ nullable: true }),
}).exec();
```

[Full list of types](./BuilderTypes.md)

[Back to top](#methods)

## Add columns to table

```ts
import { createConnection, int } from "@casper124578/mysql.ts";

const connection = await createConnection({
  /* ... */
});

// 0th arg = table name
// 1st arg = columns
const results = await connection
  .query()
  .addColumnsToTable("books", {
    rating: int({ nullable: false, DEFAULT: "0" }),
  })
  .exec();
```

[Full list of types](./BuilderTypes.md)

[Back to top](#methods)

## Drop

Drop a table or database

```ts
const connection = await createConnection({
  /* ... */
});

// Oth arg = table or database name
// 1st arg = "table" or "database"
// 2nd arg = ifExists: boolean
const results = await connection.query().drop("books", "database", true).exec();
```

[Back to top](#methods)

## Drop Column

Drop a column in a table

```ts
const connection = await createConnection({
  /* ... */
});

// Oth arg = name of the table
// 1th arg = name of the column
const results = await connection.query().dropColumn("books", "authors").exec();
```

[Back to top](#methods)

## Count

```ts
const connection = await createConnection({
  /* ... */
});

const results = await connection.query().count("books").exec();
//=> { "COUNT(*)": <number> }
```

[Back to top](#methods)

## Exec

Execute the query. This must always be at the end of the chain.

```ts
const connection = await createConnection({
  /* ... */
});

const results = await connection.query().count("books").exec();
```

[Back to top](#methods)

---

[Return to README](./README.md)
