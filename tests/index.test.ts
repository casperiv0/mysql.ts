import { createConnection } from "../src/index";

async function test() {
  const conn = await createConnection({
    host: "192.168.0.140",
    user: "root",
    password: "",
    database: "snaily-cad",
    reconnect: true,
  });

  const x = await conn
    .query<{ username: string; id: string }>()
    .select(["id"], true)
    .from("users")
    .where("id", "a7f17514-e434-4142-bc68-9360ce26df6e")
    .or("id", "f7109fd2-6678-4e5f-b9ec-c3c84f574f72")
    .exec();

  // const d = await conn.query().drop("books", "database").exec();

  console.log(x);

  console.log(conn.threadId);

  conn.end();
}

test();
