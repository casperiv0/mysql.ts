# Changelog

## 0.1.3

- Bump dependencies

## 0.1.2

- Add husky git hooks

## 0.1.1

- Bump dependencies

## 0.1.0

- **BREAKING:** Remove `returnEmptyArrayForNoResults`
- Bump dependencies
- Format code

## 0.0.20

- Make [`BuilderTypes`](https://github.com/Dev-CasperTheGhost/mysql.ts/blob/main/docs/BuilderTypes.md) options optional

## 0.0.19

- Add [custom ESLint config](https://github.com/dev-caspertheghost/eslint-config)

## 0.0.18

- Update docs

## 0.0.17

- Add `returnEmptyArrayForNoResults` to `ConnectionConfig`
- Minor code improvements

## 0.0.16

- add `QueryBuilder#resetQuery` method
- throw error when no query string is present
- bump dependencies

## 0.0.15

- Add `debugExec` to debug the `QueryBuilder#exec` method
- Add `QueryBuilder#createTableIfNotExists` method
- Add `ifExists` option to [`QueryBuilder#drop`](https://github.com/Dev-CasperTheGhost/mysql.ts/blob/main/docs/Query.md#drop) method

## 0.0.14

- Add [`QueryBuilder#whereLike`](https://github.com/Dev-CasperTheGhost/mysql.ts/blob/main/docs/Query.md#where-like) method

## 0.0.13

- Add `QueryBuilder#createTable` and `QueryBuilder#addColumnsToTable` methods
- Add `string`, `int`, `text`, `timestamp`, `date`, `json` and `customType` for `QueryBuilder#createTable`
- Update documentation

[See documentation for new methods](https://github.com/Dev-CasperTheGhost/mysql.ts/blob/main/docs/Query.md#create-table)

## 0.0.12

- Support for `Tables` type.

### Usage

<details>

<summary>View the example!</summary>

```ts
import { createConnection } from "@casper124578/mysql.ts";

type MyTables = "books" | "authors";

async function init() {
  // pass it in here!
  const connection = await createConnection<MyTables>({
    /* options */
  });

  // Works!
  const results = await connection.query().select("*").from("books").exec();

  // Typescript error!
  const other = await connection.query().select("*").from("nope").exec();
}
```

</details>

## 0.0.11

- Use `string | boolean | number` instead of `string` for `and`, `or` and `where`

## 0.0.10

- Add `or`, `renameTable`, `drop`, `count`, `dropColumn` methods to `QueryBuilder`
- Export `MysqlError`, `OkPacket`, `QueryOptions` types from `mysql`

## 0.0.9

- Make `QueryBuilder#update` & `QueryBuilder#insert` `Partial<T>`

## 0.0.8

- better TypeScript support

**Breaking change:**

`query().exec<T>()` has been replaced with `query<T>().exec()` for better TypeScript support

```diff
- const results = await connection.query().select("*").exec<T>() ...
+ const results = await connection.query<T>().select("*").exec() ...
```

## 0.0.7

- Add new methods: `beginTransaction`, `changeUser`, `commit`, `ping`, `rollback`, `statistics`
- Add `StatisticsPacket` and `ChangeUserOptions` typings
- Able to pass options to `QueryBuilder#exec`
- Export correct types

## 0.0.6

**Breaking change:**

`<Connection>.query` has been replaced with `<Connection>.query()`

```diff
- const results = await connection.query.select("*") ...
+ const results = await connection.query().select("*") ...
```

## 0.0.5

- fix: cleanup query after `exec`

## 0.0.4

- Add missing exports

## 0.0.3

- Add missing links to package.json

## 0.0.2

- Update documentation

## 0.0.1

- Initial release
- Add documentation

## 0.0.0-alpha

- Initial version
