import { ConnectionConfig as MySQLConnectionConfig } from "promise-mysql";

export interface ConnectionConfig extends MySQLConnectionConfig {
  /**
   * this will show the full query & values when a query is executed with the `QueryBuilder#exec` method
   */
  debugExec?: boolean;
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

export type CountReturn = {
  "COUNT(*)": number;
};

export type QueryValue<T = any> = string | boolean | number | T;

export interface BuilderTypeOptions<DefaultType = QueryValue> {
  nullable?: boolean;
  length?: number;
  DEFAULT?: DefaultType;
}
