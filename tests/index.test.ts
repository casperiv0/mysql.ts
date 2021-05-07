import { createConnection } from "../dist/index";

async function test() {
  const conn = await createConnection({
    host: "192.168.0.140",
    user: "root",
    password: "",
    database: "snaily-cad",
  });

  // const sql = conn.query.select("id").from("citizens").where("id", "b33a9b77-3313-43df-a2c2-1e6e20858b81");

  const sql = conn.query.delete("citizens").where("id", "b33a9b77-3313-43df-a2c2-1e6e20858b81");
  const result = await sql.exec<{ id: string }>().catch(console.error);

  console.log(result);
}

test();
