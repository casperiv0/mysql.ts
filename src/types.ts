import { ConnectionConfig as MySQLConnectionConfig } from "mysql";

export interface ConnectionConfig extends MySQLConnectionConfig {
  reconnect?: boolean;

  /**
   * this will show the full query & values when a query is executed with the `QueryBuilder#exec` method
   */
  debugExec?: boolean;

  /**
   * when no results are found for a query:
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
   * the name of the new user (defaults to the previous one)
   */
  user?: string;

  /**
   * the password of the new user (defaults to the previous one)
   */
  password?: string;

  /**
   * the new charset (defaults to the previous one)
   */
  charset?: string;

  /**
   * the new database (defaults to the previous one)
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
