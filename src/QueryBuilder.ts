import mysql from "mysql";

export class QueryBuilder<T = any> {
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
   * <Connection>.query().select("id").from("books");
   *
   * // multiple items
   * <Connection>.query().select(["id", "name"]).from("books");
   */
  select(selector: keyof T | (keyof T)[] | "*") {
    if (Array.isArray(selector)) {
      this.query += `SELECT ${selector.join(", ")} `;
    } else {
      this.query += `SELECT ${selector} `;
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
  insert(tableName: string, data: T) {
    const values = Object.keys(data).map((key) => {
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
  update(tableName: string, data: T) {
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
   * <Connection>.query().delete("books").where("name", "cool-book-name").exec();
   *
   * // delete all items from table
   * <Connection>.query().delete("books").exec();
   */
  delete(selector: string) {
    this.query = `DELETE FROM ${selector} `;

    return this;
  }

  where(selector: keyof T, value: string) {
    this.query += `WHERE ${selector} = ? `;
    this.values.push(value);

    return this;
  }

  and(selector: keyof T, value: string) {
    this.query += `AND ${selector} = ? `;
    this.values.push(value);

    return this;
  }

  order(selector: keyof T, type: "ASC" | "DESC") {
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

  /**
   * Create a raw query
   * @param query The raw query
   * @param values Values that are needed for insert, update, ..
   * @example
   *
   * // Full raw query
   * <Connection>.query().raw("SELECT * FROM `books`").exec();
   *
   * // With chaining
   * <Connection>.query().raw("SELECT * FROM `books`").where("name", "cool-book-name").exec();
   */
  raw(query: string, values?: unknown[]) {
    this.query = `${query} `;
    this.values = values ?? [];

    return this;
  }

  /**
   * Execute the query
   */
  async exec(options?: Omit<mysql.QueryOptions, "sql" | "values">): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const opts = options ? { ...options, sql: this.query, values: this.values } : this.query;

      this.connection.query(opts, this.values, (err, results) => {
        this.query = "";
        this.values = [];

        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  }

  private createKeys(data: T) {
    return Object.keys(data)
      .map((key) => {
        return `\`${key}\``;
      })
      .join(", ");
  }

  private createValues(data: T) {
    return Object.keys(data)
      .map(() => "?")
      .join(", ");
  }
}
