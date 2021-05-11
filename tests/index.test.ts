import { createConnection } from "../src/index";

type MyTables = "users" | "citizens" | "vehicles";

// type Book = {
//   id: string;
//   name: string;
//   isbn: number;
//   author: string;
// };

async function test() {
  const conn = await createConnection<MyTables>({
    host: "192.168.0.140",
    user: "root",
    password: "",
    database: "snaily-cad",
    reconnect: true,
    debugExec: true,
  });

  const x = conn.query().select("*").from("citizens").where("x", 3);

  console.log(x);

  // const d = await conn.query().drop("books", "database").exec();

  console.log(conn.threadId);

  conn.end();
}

test();
