import { Connection } from "./Connection";
import { ConnectionConfig } from "./types";
import { QueryBuilder } from "./QueryBuilder";

export async function createConnection<Tables = any>(config: ConnectionConfig): Promise<Connection<Tables>> {
  return new Connection<Tables>(config);
}

export { string, text, int, json, date } from "./BuilderTypes";
export { ConnectionConfig, StatisticsPacket, EventNames, ChangeUserOptions, CountReturn, QueryValue } from "./types";
export { Connection, QueryBuilder };
export { MysqlError, OkPacket, QueryOptions } from "mysql";
