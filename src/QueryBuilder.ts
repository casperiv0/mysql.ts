import mysql from "mysql";
import { ConnectionConfig, QueryValue } from "./types";

export class QueryBuilder<Tables, T = any> {
  private connection: mysql.Connection;
  private config!: ConnectionConfig;
  query: string;
  values: unknown[];

  constructor(connection: mysql.Connection, config?: string | ConnectionConfig) {
    this.connection = connection;

    if (config && typeof config === "object") {
      this.config = config;
    }

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
  select(selector: keyof T | (keyof T)[] | "*", distinct?: boolean) {
    const q = `SELECT ${distinct === true ? "DISTINCT" : ""}`;

    if (Array.isArray(selector)) {
      this.query += `${q} ${selector.join(", ")} `;
    } else {
      this.query += `${q} ${selector} `;
    }

    return this;
  }

  from(selector: Tables) {
    this.query += `FROM ${selector} `;

    return this;
  }

  /**
   * Insert data into a table
   * @param tableName The name of the table
   * @param data Data that needs to be inserted
   */
  insert(tableName: Tables, data: Partial<T>) {
    const values = Object.keys(data).map((key) => {
      return `${(data as any)[key]}`;
    });

    this.query += `INSERT INTO ${tableName} (${this.createKeys(data)}) VALUES (${this.createValues(data)}) `;
    this.values.push(...values);

    return this;
  }

  /**
   * Update data from a table
   * @param tableName The name of the table
   * @param data Data that needs to be updated
   */
  update(tableName: Tables, data: Partial<T>) {
    const values = Object.keys(data).map((key) => {
      return `${(data as any)[key]}`;
    });

    const keys = Object.keys(data).map((key) => {
      return `\`${key}\` = ?`;
    });

    this.query += `UPDATE ${tableName} SET ${keys} `;
    this.values.push(...values);

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
  delete(selector: Tables) {
    this.query = `DELETE FROM ${selector} `;

    return this;
  }

  where(selector: keyof T, value: QueryValue) {
    this.query += `WHERE ${selector} = ? `;
    this.values.push(value);

    return this;
  }

  whereLike(selector: keyof T, value: QueryValue) {
    this.query += `WHERE ${selector} LIKE ?`;
    this.values.push(value);

    return this;
  }

  and(selector: keyof T, value: QueryValue) {
    this.query += `AND ${selector} = ? `;
    this.values.push(value);

    return this;
  }

  or(selector: keyof T, value: QueryValue) {
    this.query += `OR ${selector} = ? `;
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

  /**
   * Rename a table
   * @param oldName The old table name you want to rename
   * @param newName The new name
   */
  renameTable(oldName: Tables, newName: string) {
    this.query += `RENAME TABLE ${oldName} TO ${newName} `;

    return this;
  }

  /**
   * Drop a database or a table
   * @param {string} name The table or database you want to drop
   * @param {"table"|"database"} type `table` or `database`
   * @param {boolean} ifExists Check if the table/database exists when dropping
   * @returns
   */
  drop(name: Tables, type: "table" | "database", ifExists?: boolean) {
    this.query += `DROP ${type.toUpperCase()} ${ifExists ? "IF EXISTS" : ""} ${name} `;

    return this;
  }

  count(selector: Tables) {
    this.query += `SELECT COUNT(*) FROM ${selector}`;

    return this;
  }

  /**
   * Delete a column in a database table
   * @param tableName The name of the table
   * @param columnName The name of the column you want to drop
   */
  dropColumn(tableName: Tables, columnName: string) {
    this.query += `ALTER TABLE ${tableName} DROP COLUMN ${columnName} `;

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
   * Create a table
   * @param name The name of the table
   * @param primary The primary key
   * @param columns The columns that need to be inserted
   * @example
   *
   * import { string, int } from "@casper124578/mysql.ts"
   *
   * <Connection>.query().createTable("books", "id", {
      id: string({ nullable: false }),
      author: string({ nullable: false }),
      isbn: int({ nullable: false, length: 50 }),
    }).exec()
   */
  createTable(name: string, primary: keyof T | undefined, columns: Partial<Record<keyof T, string>>) {
    const primaryKey = primary ? `, PRIMARY KEY (${primary})` : "";
    const values = this.createTableValues(columns);

    this.query = `CREATE TABLE ${name} (${values} ${primaryKey}) `;

    return this;
  }

  /**
   * Same as `QueryBuilder#createTable` but only create the table if it doesn't exist
   * @see [https://github.com/Dev-CasperTheGhost/mysql.ts/blob/main/docs/Query.md#create-table](https://github.com/Dev-CasperTheGhost/mysql.ts/blob/main/docs/Query.md#create-table)
   */
  createTableIfNotExists(name: string, primary: keyof T | undefined, columns: Partial<Record<keyof T, string>>) {
    const primaryKey = primary ? `, PRIMARY KEY (${primary})` : "";
    const values = this.createTableValues(columns);

    this.query = `CREATE TABLE IF NOT EXISTS ${name} (${values} ${primaryKey}) `;

    return this;
  }

  /**
   * Add more columns to a table
   * @param name The name of the table
   * @param columns The columns to add
   * @example
   *
   * import { text } from "@casper124578/mysql.ts"
   *
   * <Connection>.query().addColumnsToTable("books", {
   *   description: text({ nullable: false })
   * }).exec()
   */
  addColumnsToTable(name: Tables, columns: { [key: string]: string }) {
    const values = Object.keys(columns)
      .map((value) => {
        return `${value} ${(columns as any)[value]}`;
      })
      .join(",");

    this.query = `ALTER TABLE ${name} ADD ${values}`;

    return this;
  }

  /**
   * Reset the query string and values
   */
  resetQuery() {
    this.query = "";
    this.values = [];

    return this;
  }

  /**
   * Execute the query
   */
  async exec(options?: Omit<mysql.QueryOptions, "sql" | "values">): Promise<T[] | undefined> {
    if (this.config.debugExec === true) {
      console.info(`[mysql.ts]: Query: ${this.query}`);
      console.info("[mysql.ts]: Values: ", this.values);
    }

    if (!this.query) {
      throw new Error("[mysql.ts]: Cannot execute a query without a query string.");
    }

    return new Promise((resolve, reject) => {
      const opts = options ? { ...options, sql: this.query, values: this.values } : this.query;

      this.connection.query(opts, this.values, (err, results) => {
        this.resetQuery();

        if (err) {
          return reject(err);
        }

        if (this.config.returnEmptyArrayForNoResults) {
          return resolve(results);
        } else {
          if (results.length <= 0) {
            return resolve(undefined);
          }
        }
      });
    });
  }

  private createTableValues(columns: Partial<Record<keyof T, string>>) {
    return Object.keys(columns)
      .map((value) => {
        return `${value} ${(columns as any)[value]}`;
      })
      .join(",\n");
  }

  private createKeys(data: Partial<T>) {
    return Object.keys(data)
      .map((key) => {
        return `\`${key}\``;
      })
      .join(", ");
  }

  private createValues(data: Partial<T>) {
    return Object.keys(data)
      .map(() => "?")
      .join(", ");
  }
}
