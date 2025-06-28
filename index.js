import express from "express";
import connection from "./db.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/products", async (req, res) => {
  const query = "SELECT * FROM products";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching products:", err.stack);
      res.status(500).send("Error fetching products");
      return;
    }
    res.json(results);
  });
});

app.post("/products", async (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Name and price required" });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO products (name, price) VALUES (?, ?) [name, price]"
    );
    await connection.release();

    res.status(201).json({
      message: "The product successfully added",
      productId: result.insertId,
    });
  } catch (error) {
    console.error("Error during adding product");
    res.status(500).json({ error: "Error during adding product" });
  }
});

app.use((err, req, res, next) => {
  console.error("Error during request handling", err);
  res.status(500).send("Internal server error");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
