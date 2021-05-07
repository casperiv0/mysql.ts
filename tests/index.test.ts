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

  // const sql = conn.query().delete("citizens").where("id", "b33a9b77-3313-43df-a2c2-1e6e20858b81");

  await conn.end();
}

test();
