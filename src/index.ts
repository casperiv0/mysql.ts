import { Connection } from "./Connection";
import { ConnectionConfig } from "./types";
import { QueryBuilder } from "./QueryBuilder";

/**
 * create the connection to the database
 * @param {ConnectionConfig} config The connection config
 * @see [https://github.com/mysqljs/mysql#connection-options](https://github.com/mysqljs/mysql#connection-options)
 * @returns The connection
 */
export async function createConnection<Tables = any>(config: ConnectionConfig): Promise<Connection<Tables>> {
  return new Connection<Tables>(config);
}

export { string, text, int, json, date, timestamp, customType } from "./BuilderTypes";
export {
  ConnectionConfig,
  StatisticsPacket,
  EventNames,
  ChangeUserOptions,
  CountReturn,
  QueryValue,
  BuilderTypeOptions,
} from "./types";
export { Connection, QueryBuilder };
export { MysqlError, OkPacket, QueryOptions } from "mysql";
