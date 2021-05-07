import { createConnection } from "../src/index";

async function test() {
  const conn = await createConnection({
    host: "192.168.0.140",
    user: "root",
    password: "",
    database: "snaily-cad",
    reconnect: true,
  });

  // const sql = conn.query.select("*").from("citizens").order("full_name", "ASC");
  const sql = conn.query.raw("SELECT * FROM `citizens`").where("id", "a22e0c79-5ecd-4012-85bb-a214196e2d72");

  // const sql = conn.query.delete("citizens").where("id", "b33a9b77-3313-43df-a2c2-1e6e20858b81");
  const result = await sql.exec().catch(console.error);

  result;

  await conn.end();
}

test();
