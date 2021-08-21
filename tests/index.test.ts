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
    host: "192.168.0.138",
    user: "root",
    password: "",
    database: "snaily-cad",
    debugExec: true,
  });

  const x = await conn
    .query<{ id: "hello" }>()
    .createTable("test", "id", {
      id: string({ nullable: true }),
    })
    .exec();

  console.log(x);

  // const d = await conn.query().drop("books", "database").exec();

  console.log(conn.threadId);

  conn.end();
}

test();
