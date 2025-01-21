import {
  addEquipment,
  getAverageRating,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  searchEquipmentByName,
} from "../models/equipment.mjs";
import db from "../config/db.mjs";

export const createEquipment = async (req, res) => {
  try {
    const {
      userid,
      categoryid,
      name,
      description,
      noofitems,
      avaibilitystatus,
      location,
      imageurl
    } = req.body;

    if (
      !userid ||
      !categoryid ||
      !name ||
      !description ||
      !noofitems ||
      !avaibilitystatus ||
      !location || 
      !imageurl
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newEquipment = await addEquipment(
      userid,
      categoryid,
      name,
      description,
      noofitems,
      avaibilitystatus,
      location,
      imageurl
    );
    res.status(201).json(newEquipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding equipment." });
  }
};

export const getEquipment = async (req, res) => {
  try {
    const equipment = await getAllEquipment();
    res.json(equipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching equipment." });
  }
};

export const getEquipmentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await getEquipmentById(id);

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found." });
    }

    res.json(equipment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching equipment details." });
  }
};

export const modifyEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No updates provided." });
    }

    const updatedEquipment = await updateEquipment(id, updates);
    res.json(updatedEquipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating equipment." });
  }
};

export const removeEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteEquipment(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting equipment." });
  }
};

export const searchEquipment = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await searchEquipmentByName(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllImagesByEquipmentId = async (req, res) => {
  const { equipmentid } = req.params;

  try {
    const images = await db.any(
      "SELECT imagepath FROM EquipmentImages WHERE equipmentid = $1",
      [equipmentid]
    );

    res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve images",
    });
  }
};

export const getPrimaryImageByEquipmentId = async (req, res) => {
  const { equipmentid } = req.params;

  try {
    const primaryImage = await db.oneOrNone(
      "SELECT imagepath FROM EquipmentImages WHERE equipmentid = $1 AND isprimary = TRUE",
      [equipmentid]
    );

    if (primaryImage) {
      res.status(200).json({
        success: true,
        primaryImage: primaryImage.imagepath,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Primary image not found",
      });
    }
  } catch (error) {
    console.error("Error retrieving primary image:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve primary image",
    });
  }
};

export const getAvgRating = async (req, res) => {
  const { id } = req.params;

  try {
    const averageRating = await getAverageRating(id);
    res.json({ averageRating });
  } catch (error) {
    res.status(500).json({ error: "Error fetching average rating" });
  }
};

export const getReviewCount = async (req, res) => {
  const { equipmentid } = req.params;

  try {
      const result = await db.one(
          "SELECT COUNT(*) AS review_count FROM Reviews WHERE equipmentid = $1",
          [equipmentid]
      );

      res.status(200).json({
          success: true,
          reviewCount: parseInt(result.review_count, 10),
      });
  } catch (error) {
      console.error("Error fetching review count:", error);
      res.status(500).json({
          success: false,
          message: "Failed to retrieve review count.",
      });
  }
};

