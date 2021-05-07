import mysql from "mysql";

export class QueryBuilder {
  private connection: mysql.Connection;
  query: string;
  values: unknown[];

  constructor(connection: mysql.Connection) {
    this.connection = connection;
    this.query = "";
    this.values = [];
  }

  /**
   * Select 1 or more items from a table
   * @param {string|string[]} selector
   * @example
   *
   * // 1 item
   * <Connection>.query.select("id").from("books");
   *
   * // multiple items
   * <Connection>.query.select(["id", "name"]).from("books");
   */
  select(selector: string | string[]) {
    if (typeof selector === "string") {
      this.query += `SELECT ${selector} `;
    } else {
      this.query += `SELECT ${selector.join(", ")} `;
    }

    return this;
  }

  from(selector: string) {
    this.query += `FROM ${selector} `;

    return this;
  }

  /**
   * Insert data into a table
   * @param tableName The name of the table
   * @param data Data that needs to be inserted
   */
  insert<T = Record<string, unknown>>(tableName: string, data: T) {
    const values = Object.keys(data).map((key) => {
      // eslint-disable-next-line
      return `${(data as any)[key]}`;
    });

    this.query += `INSERT INTO ${tableName} (${this.createKeys(data)}) VALUES (${this.createValues(data)}) `;
    this.values = [...this.values, ...values];

    return this;
  }

  /**
   * Update data from a table
   * @param tableName The name of the table
   * @param data Data that needs to be updated
   */
  update<T = Record<string, unknown>>(tableName: string, data: T) {
    const values = Object.keys(data).map((key) => {
      return `${(data as any)[key]}`;
    });

    const keys = Object.keys(data).map((key) => {
      return `\`${key}\` = ?`;
    });

    this.query += `UPDATE ${tableName} SET ${keys} `;
    this.values = [...this.values, ...values];

    return this;
  }

  /**
   * Delete something from the table
   * @param selector The table name
   * @example
   * // delete an item with 'where'
   * <Connection>.query.delete("books").where("name", "cool-book-name");
   *
   * // delete all items from table
   * <Connection>.query.delete("books");
   */
  delete(selector: string) {
    this.query = `DELETE FROM ${selector} `;

    return this;
  }

  where(selector: string, value: string) {
    this.query += `WHERE ${selector} = ? `;
    this.values.push(value);

    return this;
  }

  order(selector: string, type: "ASC" | "DESC") {
    this.query += `ORDER BY ${selector} ${type.toUpperCase()} `;

    return this;
  }

  limit(n: number | string) {
    this.query += `LIMIT ${n}`;

    return this;
  }

  having(condition: string) {
    this.query += `HAVING ${condition} `;

    return this;
  }

  raw(query: string, values: unknown[]) {
    this.query = query;
    this.values = values;

    return this;
  }

  /**
   * Execute the query
   */
  async exec<T>(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(this.query, this.values, (err, results) => {
        if (err) {
          reject(err);
        }

        return resolve(results);
      });
    });
  }

  private createKeys<T>(data: T) {
    return Object.keys(data)
      .map((key) => {
        return `\`${key}\``;
      })
      .join(", ");
  }

  private createValues<T>(data: T) {
    return Object.keys(data)
      .map(() => "?")
      .join(", ");
  }
}
