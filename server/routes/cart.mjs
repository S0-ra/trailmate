import express from "express";
import db from "../config/db.mjs";

const router = express.Router();

router.get("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const cartItems = await db.any(
      `
      SELECT *
      FROM cart 
      WHERE userid = $1
    `,
      [userid]
    );

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve cart", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userid, equipmentid, quantity,price } = req.body;
    const result = await db.none(
      `
      INSERT INTO Cart (userid, equipmentid, quantity,price)
      VALUES ($1, $2, $3,$4)
    `,
      [userid, equipmentid, quantity,price]
    );

    res.status(201).json({ message: "Item added to cart", success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to add item", error });
  }
});

router.put("/:cartid", async (req, res) => {
  try {
    const { cartid } = req.params;
    const { quantity } = req.body;

    await db.none(
      `
      UPDATE Cart
      SET quantity = $1
      WHERE cartid = $2
    `,
      [quantity, cartid]
    );

    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update quantity", error });
  }
});

router.delete("/:cartid", async (req, res) => {
  try {
    const { cartid } = req.params;
    await db.none(
      `
      DELETE FROM Cart
      WHERE cartid = $1
    `,
      [cartid]
    );

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item", error });
  }
});

export default router;
