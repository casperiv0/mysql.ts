import { Connection } from "./Connection";
import { ConnectionConfig } from "./types";
import { QueryBuilder } from "./QueryBuilder";

export async function createConnection(config: ConnectionConfig): Promise<Connection> {
  return new Connection(config);
}

export { Connection, QueryBuilder };
export type { ConnectionConfig };
