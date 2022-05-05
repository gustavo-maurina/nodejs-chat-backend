import pg from "pg";

const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

client.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

export { client as db };
