import { Connection as _Connection } from "promise-mysql";
import mysql from "mysql";
import { QueryBuilder } from "./QueryBuilder";
import { ConnectionConfig } from "./types";

export class Connection<Tables> extends _Connection {
  public connection!: mysql.Connection;
  private config: ConnectionConfig | string;

  constructor(config: ConnectionConfig | string = {}) {
    super(config);

    this.config = config;
  }

  get state(): string {
    return this.connection.state;
  }

  get threadId(): number | null {
    return this.connection.threadId;
  }

  // @ts-expect-error ignore
  override query<T = any>(): QueryBuilder<Tables, T> {
    return new QueryBuilder<Tables, T>(this.connection, this.config);
  }
}
