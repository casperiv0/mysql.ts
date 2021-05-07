import mysql from "mysql";
import { QueryBuilder } from "./QueryBuilder";
import { ConnectionConfig } from "./types";

export class Connection {
  public config: ConnectionConfig | string;
  public connection!: mysql.Connection;
  private reconnect: boolean;
  public query!: QueryBuilder;

  constructor(config: ConnectionConfig | string = {}) {
    let _connection: mysql.Connection;
    this.config = config;

    if (typeof config !== "string") {
      this.reconnect = config.reconnect ?? true;
    } else {
      this.reconnect = true;
    }

    // @ts-expect-error ignore
    return Promise.resolve(mysql)
      .then(async () => {
        if (_connection && this.reconnect) {
          this.addReconnectHandler(_connection);
        } else if (!_connection) {
          _connection = await this.connect();
        }

        return _connection;
      })
      .then((connection) => {
        this.connection = connection;
        this.query = new QueryBuilder(connection);

        return this;
      });
  }

  destroy() {
    this.connection.destroy();
  }

  end() {
    return new Promise((resolve, reject) => {
      return this.connection.end((err) => {
        if (err) {
          return reject(err);
        }

        resolve(true);
      });
    });
  }

  format(sql: string, values: unknown[]) {
    return this.connection.format(sql, values);
  }

  pause() {
    this.connection.pause();
  }

  resume() {
    this.connection.resume();
  }

  on(eventName: string, listener: (...args: any[]) => void) {
    this.connection.on(eventName, listener);
  }

  async connect(): Promise<mysql.Connection> {
    const connection = mysql.createConnection(this.config);

    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          return reject(err);
        }

        if (this.reconnect === true) {
          this.addReconnectHandler(connection);
        }

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
