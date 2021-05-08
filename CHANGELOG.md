# Changelog

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
