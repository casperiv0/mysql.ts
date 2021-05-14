# Connection

## Usage

```ts
import { createConnection } from "@casper124578/mysql.ts";

async function init() {
  const connection = await createConnection({
    /* options */
    /* see: https://github.com/mysqljs/mysql#connection-options */
  });

  console.log(connection);
}
```

## Methods

- [beginTransaction](https://github.com/mysqljs/mysql#transactions)
- [changeUser](https://github.com/mysqljs/mysql#switching-users-and-altering-connection-state)
- [commit](https://github.com/mysqljs/mysql#transactions)
- [end](https://github.com/mysqljs/mysql#terminating-connections)
- [destroy](https://github.com/mysqljs/mysql#terminating-connections)
- [format](https://github.com/mysqljs/mysql#escaping-query-values)
- [on](https://github.com/mysqljs/mysql#error-handling)
- [pause](https://github.com/mysqljs/mysql#streaming-query-rows)
- [ping](https://github.com/mysqljs/mysql#ping)
- [resume](https://github.com/mysqljs/mysql#streaming-query-rows)
- [rollback](https://github.com/mysqljs/mysql#transactions)
- statistics
- connect

---

[Return to README](./README.md)
