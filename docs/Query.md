# Query

## Table of contents

- [Select](#select)
- [Insert](#insert)
- [Update](#update)
- [Delete](#delete)
- [Raw](#raw)
- [All methods](#all-methods)

## Select

```ts
const connection = await createConnection({
  /* ... */
});

const books = await connection.query.select("*").from("books").where("name", "some-book-name").exec();
```

## Insert

```ts
const connection = await createConnection({
  /* ... */
});

const data = {
  id: 1,
  name: "book-name",
};

const result = await connection.query.insert("books", data).exec();
```

## Update

```ts
const connection = await createConnection({
  /* ... */
});

const data = {
  id: 1,
  name: "book-name",
};

const result = await connection.query.update("books", data).where("id", data.id).exec();
```

## Delete

```ts
const connection = await createConnection({
  /* ... */
});

const result = await connection.query.delete("books").where("name", "book-name").exec();
```

## Raw

```ts
const connection = await createConnection({
  /* ... */
});

// Full raw query
const result = await connection.query.raw("SELECT * FROM `books`").exec();

const result = await connection.query
  .raw("INSERT INTO `books` (`id`, `name`) VALUES (?, ?)", ["2", "book-name"])
  .exec();

// With chaining
const result = await connection.query.raw("SELECT * FROM `books`").where("name", "cool-book-name").exec();
```

## All methods

- `select`
- `from`
- `insert`
- `update`
- `delete`
- `where`
- `order`
- `limit`
- `having`
- `raw`
- `exec`
- `and`
