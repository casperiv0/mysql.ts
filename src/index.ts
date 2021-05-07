import { Connection } from "./Connection";
import { ConnectionConfig } from "./types";

export async function createConnection(config: ConnectionConfig): Promise<Connection> {
  return new Connection(config);
}
