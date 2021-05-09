import { createConnection, string } from "../src/index";

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
    database: "snaily-cad-demo",
    reconnect: true,
    debugExec: true,
  });

  const x = await conn
    .query()
    .createTableIfNotExists("citizens", "id", {
      value: string({ nullable: false }),
    })
    .exec();
  // const d = await conn.query().drop("books", "database").exec();

  console.log(x);

  console.log(conn.threadId);

  conn.end();
}

test();
