import { Connection } from "./Connection";
import { ConnectionConfig } from "./types";
import { QueryBuilder } from "./QueryBuilder";

export async function createConnection(config: ConnectionConfig): Promise<Connection> {
  return new Connection(config);
}

export { ConnectionConfig, StatisticsPacket, EventNames, ChangeUserOptions, CountReturn } from "./types";
export { Connection, QueryBuilder };
export { MysqlError, OkPacket, QueryOptions } from "mysql";
