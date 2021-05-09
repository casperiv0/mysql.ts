import mysql, { OkPacket } from "mysql";
import { promisify } from "./promisify";
import { QueryBuilder } from "./QueryBuilder";
import { ChangeUserOptions, ConnectionConfig, EventNames, StatisticsPacket } from "./types";

export class Connection<Tables> {
  public config: ConnectionConfig | string;
  public connection!: mysql.Connection;
  private reconnect: boolean;
  private debug: boolean;

  constructor(config: ConnectionConfig | string = {}) {
    let _connection: mysql.Connection;
    this.config = config;

    if (typeof config !== "string") {
      this.reconnect = config.reconnect ?? true;
      this.debug = config.debugExec ?? false;
    } else {
      this.debug = false;
      this.reconnect = true;
    }

    // @ts-expect-error ignore
    return Promise.resolve(this).then(async () => {
      if (_connection && this.reconnect) {
        this.addReconnectHandler(_connection);
      } else if (!_connection) {
        _connection = await this.connect();
      }

      return this;
    });
  }

  get state(): string {
    return this.connection.state;
  }

  get threadId(): number | null {
    return this.connection.threadId;
  }

  beginTransaction(options?: mysql.QueryOptions): Promise<void> {
    return promisify.apply(this.connection, ["beginTransaction", options]);
  }

  changeUser(options?: ChangeUserOptions): Promise<void> {
    return promisify.apply(this.connection, ["changeUser", options]);
  }

  commit(): Promise<void> {
    return promisify.apply(this.connection, ["commit", null]);
  }

  end(options?: mysql.QueryOptions): Promise<void> {
    return promisify.apply(this.connection, ["end", options]);
  }

  destroy(): void {
    this.connection.destroy();
  }

  format(sql: string, values: unknown[]): string {
    return this.connection.format(sql, values);
  }

  on(eventName: EventNames, listener: (...args: any[]) => void) {
    this.connection.on(eventName, listener);
  }

  pause(): void {
    this.connection.pause();
  }

  ping(options?: mysql.QueryOptions): Promise<OkPacket> {
    return promisify.apply(this.connection, ["ping", options]);
  }

  query<T = any>(): QueryBuilder<Tables, T> {
    return new QueryBuilder<Tables, T>(this.connection, this.debug);
  }

  resume(): void {
    this.connection.resume();
  }

  rollback(options?: mysql.QueryOptions) {
    return promisify.apply(this.connection, ["rollback", options]);
  }

  statistics(options?: mysql.QueryOptions): Promise<StatisticsPacket> {
    return promisify.apply(this.connection, ["statistics", options]);
  }

  async connect(): Promise<mysql.Connection> {
    const connection = mysql.createConnection(this.config);

    return new Promise((resolve, reject) => {
      return connection.connect(async (err) => {
        if (err) {
          return reject(err);
        }

        if (this.reconnect === true) {
          this.addReconnectHandler(connection);
        }

        this.connection = connection;
        return resolve(connection);
      });
    });
  }

  private async addReconnectHandler(connection: mysql.Connection) {
    const ERROR_CODES = ["PROTOCOL_CONNECTION_LOST", "ECONNRESET", "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"];

    connection.once("error", (err) => {
      if (ERROR_CODES.includes(err)) {
        this.connect();
      }
    });
  }
}
