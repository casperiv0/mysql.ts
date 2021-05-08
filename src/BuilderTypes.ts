import { QueryValue, BuilderTypeOptions } from "./types";

/**
 * Defaults: `nullable = true`, `length = 255`
 */
export function string({ nullable = true, length = 255, DEFAULT }: BuilderTypeOptions): string {
  return `varchar(${length}) ${_returnNullable(nullable)} ${_returnDefault(DEFAULT)}`;
}

/**
 * Defaults: `nullable = true`, `length = 8`
 */
export function int({ nullable = true, length = 8, DEFAULT }: BuilderTypeOptions<number>): string {
  return `int(${length}) ${_returnNullable(nullable)} ${_returnDefault(DEFAULT)}`;
}

export function text({ nullable, DEFAULT }: Omit<BuilderTypeOptions, "length">): string {
  return `text ${_returnNullable(nullable)} ${_returnDefault(DEFAULT)}`;
}

export function date({ nullable = true, DEFAULT }: Omit<BuilderTypeOptions, "length">) {
  return `DATE ${_returnNullable(nullable)} ${_returnDefault(DEFAULT)}`;
}

export function json({ nullable = true, DEFAULT = {} }: Omit<BuilderTypeOptions<any>, "length">) {
  return `JSON ${_returnNullable(nullable)} ${_returnDefault(DEFAULT)}`;
}

function _returnNullable(nullable: boolean | undefined) {
  return nullable === false ? "NOT NULL" : "";
}

function _returnDefault(string: QueryValue | undefined) {
  return string ? `DEFAULT '${JSON.stringify(string)}'` : "";
}
