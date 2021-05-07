import { createConnection } from "../src/index";

async function test() {
  const conn = await createConnection({
    host: "192.168.0.140",
    user: "root",
    password: "",
    database: "snaily-cad",
    reconnect: true,
  });

  const x = await conn.query().select(["id", "full_name", "user_id"]).from("citizens").order("full_name", "ASC").exec();
  console.log(x);

  console.log(conn.threadId);

  conn.end({ timeout: 500, sql: "" });
}

test();
