const express = require('express');
const { Category } = require('../models');
const router = express.Router();

// Create a new category
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë krijimit të kategorisë!' });
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë marrjes së kategorive!' });
    }
});

// Get a single category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Kategoria nuk u gjet!' });
        }
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë marrjes së kategorisë!' });
    }
});

// Update a category
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Kategoria nuk u gjet!' });
        }

        await category.update({ name });
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë përditësimit të kategorisë!' });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Kategoria nuk u gjet!' });
        }

        await category.destroy();
        res.json({ message: 'Kategoria u fshi me sukses!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë fshirjes së kategorisë!' });
    }
});

module.exports = router;