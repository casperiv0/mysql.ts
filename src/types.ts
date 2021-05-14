import { ConnectionConfig as MySQLConnectionConfig } from "mysql";

export interface ConnectionConfig extends MySQLConnectionConfig {
  reconnect?: boolean;

  /**
   * This will show the full query & values when a query is executed with the `QueryBuilder#exec` method
   */
  debugExec?: boolean;

  /**
   * When no results are found for a query:
   *
   * `false` = return `undefined`
   *
   * `true` = returns an empty array
   *
   * @default false
   */
  returnEmptyArrayForNoResults?: boolean;
}

export interface StatisticsPacket {
  message: string;
  uptime: number;
  threads: number;
  questions: number;
  slow_queries: number;
  opens: number;
  flush_tables: number;
  queries_per_second_avg: number;
}

export interface ChangeUserOptions {
  /**
   * The name of the new user (defaults to the previous one)
   */
  user?: string;

  /**
   * The password of the new user (defaults to the previous one)
   */
  password?: string;

  /**
   * The new charset (defaults to the previous one)
   */
  charset?: string;

  /**
   * The new database (defaults to the previous one)
   */
  database?: string;
}

export type EventNames = "error" | "end";

export type CountReturn = {
  "COUNT(*)": number;
};

export type QueryValue = string | boolean | number;

export interface BuilderTypeOptions<DefaultType = QueryValue> {
  nullable?: boolean;
  length?: number;
  DEFAULT?: DefaultType;
}
