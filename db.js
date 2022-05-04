import pg from "pg";

export const client = new pg.Client({
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
