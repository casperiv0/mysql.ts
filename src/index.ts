import { Connection } from "./Connection";
import { QueryBuilder } from "./QueryBuilder";
import { ConnectionConfig } from "./types";

/**
 * create the connection to the database
 * @param {ConnectionConfig} config The connection config
 * @see [https://github.com/mysqljs/mysql#connection-options](https://github.com/mysqljs/mysql#connection-options)
 * @returns The connection
 */
export async function createConnection<Tables = any>(
  config: ConnectionConfig | string,
): Promise<Connection<Tables>> {
  return new Connection(config);
}

export * from "./BuilderTypes";
export * from "./types";
export { Connection, QueryBuilder };
export { MysqlError, OkPacket, QueryOptions } from "mysql";
