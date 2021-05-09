# Builder types

See supported types bellow

- [`string`](#string)
- [`int`](#int)
- [`text`](#text)
- [`date`](#date)
- [`json`](#json)
- [`timestamp`](#timestamp)
- [`customType`](#customtype)

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
