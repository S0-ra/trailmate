import db from "../config/db.mjs";

export const addEquipment = async (
  userid,
  categoryid,
  name,
  description,
  noofitems,
  availabilitystatus,
  location,
  imageurl
) => {
  const query = `
    INSERT INTO equipment (userid, categoryid, name, description, noofitems, availabilitystatus, location, dateadded,imageurl)
    VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE,$8)
    RETURNING *;
  `;
  return db.one(query, [
    userid,
    categoryid,
    name,
    description,
    noofitems,
    availabilitystatus,
    location,
    imageurl,
  ]);
};

export const getEquipmentById = async (equipmentid) => {
  return await db.oneOrNone(`SELECT * FROM equipment WHERE equipmentid = $1`, [
    equipmentid,
  ]);
};

export const getAllEquipment = async () => {
  return await db.manyOrNone(`SELECT * FROM equipment`);
};

export const updateEquipment = async (equipmentid, updates) => {
  const fields = Object.keys(updates)
    .map((key, idx) => `${key} = $${idx + 2}`)
    .join(", ");
  const values = Object.values(updates);
  return await db.one(
    `UPDATE equipment SET ${fields} WHERE equipmentid = $1 RETURNING *`,
    [equipmentid, ...values]
  );
};

export const deleteEquipment = async (equipmentid) => {
  return await db.none(`DELETE FROM equipment WHERE equipmentid = $1`, [
    equipmentid,
  ]);
};

export const searchEquipmentByName = async (searchQuery) => {
  return await db.one(
    "SELECT * FROM equipment WHERE LOWER(name) LIKE LOWER($1)",
    [`%${searchQuery}%`]
  );
};

export const getAverageRating = async (equipmentId) => {
  try {
    const result = await db.oneOrNone(
      `SELECT AVG(rating) AS average_rating
       FROM reviews
       WHERE equipmentid = $1;`,
      [equipmentId]
    );

    return result?.average_rating || 0;
  } catch (error) {
    console.error("Error fetching average rating:", error);
    throw error;
  }
};

export const filterEquipment = async (equipmentList, filters) => {
  return equipmentList
    .filter((equipment) => {
      if (filters.categoryid && equipment.categoryid !== filters.categoryid) {
        return false;
      }
      if (filters.minPrice && equipment.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && equipment.price > filters.maxPrice) {
        return false;
      }
      if (filters.minRating && equipment.rating < filters.minRating) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return a.price - b.price;
    });
};

export const getRating = async (equipmentId) => {
  return await db.one(`SELECT rating from equipment WHERE equipmentid=$1`, [
    equipmentId,
  ]);
};
