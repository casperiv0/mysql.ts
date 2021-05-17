import { QueryValue, BuilderTypeOptions } from "./types";

/**
 * defaults: `nullable = true`, `length = 255`
 */
export function string({ nullable = true, length = 255, DEFAULT }: BuilderTypeOptions): string {
  return `varchar(${length}) ${_returnNullable(nullable)} ${_returnDefault(DEFAULT)}`;
}

/**
 * defaults: `nullable = true`, `length = 8`
 */
export function int({ nullable = true, length = 8, DEFAULT }: BuilderTypeOptions<number>): string {
  return `int(${length}) ${_returnNullable(nullable)} ${_returnDefault(DEFAULT)}`;
}

/**
 * defaults: `nullable = true`
 */
export function text({ nullable = true, DEFAULT }: Omit<BuilderTypeOptions, "length">): string {
  return `text ${_returnNullable(nullable)} ${_returnDefault(DEFAULT)}`;
}

/**
 * defaults: `nullable = true`
 */
export function date({ nullable = true, DEFAULT }: Omit<BuilderTypeOptions, "length">) {
  return `DATE ${_returnNullable(nullable)} ${_returnDefault(DEFAULT)}`;
}

/**
 * defaults: `nullable = true`, `DEFAULT = {}`
 */
export function json({ nullable = true, DEFAULT = {} }: Omit<BuilderTypeOptions<any>, "length">) {
  return `JSON ${_returnNullable(nullable)} ${_returnDefault(DEFAULT)}`;
}

/**
 * defaults: `nullable = true`
 */
export function timestamp({ nullable = true, DEFAULT }: Omit<BuilderTypeOptions, "length">) {
  return `TIMESTAMP ${_returnNullable(nullable)} ${_returnDefault(DEFAULT)}`;
}

/**
 * @see [https://github.com/Dev-CasperTheGhost/mysql.ts/blob/main/docs/BuilderTypes.md#customtype](https://github.com/Dev-CasperTheGhost/mysql.ts/blob/main/docs/BuilderTypes.md#customtype)
 */
export function customType<T = string>(type: string, { nullable = true, DEFAULT }: BuilderTypeOptions<T>) {
  return `${type} ${_returnNullable(nullable)} ${_returnDefault(DEFAULT as any)}`;
}

function _returnNullable(nullable: boolean | undefined) {
  return nullable === false ? "NOT NULL" : "";
}

function _returnDefault(string: QueryValue | undefined) {
  return string ? `DEFAULT '${JSON.stringify(string)}'` : "";
}
