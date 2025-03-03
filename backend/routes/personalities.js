const express = require("express");
const { Op } = require("sequelize");
const { Personality, Category } = require("../models");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      biography,
      birth_date,
      short_description,
      profession,
      death_date,
      categories,
    } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null; // Store public path

    const personality = await Personality.create({
      name,
      biography,
      birth_date,
      short_description,
      profession,
      death_date,
      image_url,
    });

    if (categories) {
      const categoryIds = Array.isArray(categories)
        ? categories
        : JSON.parse(categories);
      const categoryInstances = await Category.findAll({
        where: { id: categoryIds },
      });
      await personality.addCategories(categoryInstances);
    }

    res.json(personality);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gabim gjatë krijimit të personalitetit!" });
  }
});

// Search personalities by name
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 3) {
      return res.json([]);
    }

    const personalities = await Personality.findAll({
      where: {
        name: {
          [Op.like]: `%${q}%`, // Case-insensitive search
        },
      },
      limit: 10, // Limit results
    });

    res.json(personalities);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const personalities = await Personality.findAll({
      include: {
        model: Category,
        through: { attributes: [] }, // Exclude join table attributes
      },
    });
    res.json(personalities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gabim gjatë marrjes së personaliteteve!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const personality = await Personality.findByPk(req.params.id, {
      include: {
        model: Category,
        through: { attributes: [] },
      },
    });
    if (!personality) {
      return res.status(404).json({ error: "Personaliteti nuk u gjet!" });
    }
    res.json(personality);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gabim gjatë marrjes së personalitetit!" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      biography,
      birth_date,
      short_description,
      profession,
      death_date,
      categories,
    } = req.body;

    // If a new image is uploaded, update the image URL; otherwise, keep the old one
    const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    const personality = await Personality.findByPk(id);
    if (!personality) {
      return res.status(404).json({ error: "Personaliteti nuk u gjet!" });
    }

    // Update personality data
    await personality.update({
      name,
      biography,
      birth_date,
      short_description,
      profession,
      death_date,
      image_url: image_url || personality.image_url, // Keep old image if no new one is provided
    });

    // Handle categories (optional)
    if (categories) {
      let categoryIds;
      try {
        categoryIds = Array.isArray(categories)
          ? categories
          : JSON.parse(categories);
      } catch (err) {
        return res.status(400).json({ error: "Invalid category format" });
      }

      const categoryInstances = await Category.findAll({
        where: { id: categoryIds },
      });
      await personality.setCategories(categoryInstances);
    }

    res.json(personality);
  } catch (error) {
    console.error("Error updating personality:", error);
    res
      .status(500)
      .json({ error: "Gabim gjatë përditësimit të personalitetit!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const personality = await Personality.findByPk(id);
    if (!personality) {
      return res.status(404).json({ error: "Personaliteti nuk u gjet!" });
    }

    await personality.destroy();
    res.json({ message: "Personaliteti u fshi me sukses!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gabim gjatë fshirjes së personalitetit!" });
  }
});

module.exports = router;
