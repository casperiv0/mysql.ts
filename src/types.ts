import mysql from "mysql";

export interface ConnectionConfig extends mysql.ConnectionConfig {
  reconnect?: boolean;
}
