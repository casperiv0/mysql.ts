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
    .select("*")
    .from("users")
    .where("username", "qsd")
    .order("username", "ASC")
    .exec();

  console.log(x);
  console.log(conn.threadId);

  conn.end();
}

test();
