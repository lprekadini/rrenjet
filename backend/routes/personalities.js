const express = require('express');
const { Personality, Category } = require('../models');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, biography, birth_date, categories } = req.body;
        const image_path = req.file ? req.file.path : null;

        const personality = await Personality.create({ 
            name, 
            biography, 
            birth_date, 
            image_path 
        });

        if (categories) {
            const categoryInstances = await Category.findAll({ where: { id: categories } });
            await personality.addCategories(categoryInstances);
        }

        res.json(personality);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë krijimit të personalitetit!' });
    }
});

router.get('/', async (req, res) => {
    try {
        const personalities = await Personality.findAll({ include: Category });
        res.json(personalities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë marrjes së personaliteteve!' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const personality = await Personality.findByPk(req.params.id, { include: Category });
        if (!personality) {
            return res.status(404).json({ error: 'Personaliteti nuk u gjet!' });
        }
        res.json(personality);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë marrjes së personalitetit!' });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, biography, birth_date, categories } = req.body;
        const image_path = req.file ? req.file.path : null;

        const personality = await Personality.findByPk(id);
        if (!personality) {
            return res.status(404).json({ error: 'Personaliteti nuk u gjet!' });
        }

        await personality.update({
            name,
            biography,
            birth_date,
            image_path: image_path || personality.image_path
        });

        if (categories) {
            const categoryInstances = await Category.findAll({ where: { id: categories } });
            await personality.setCategories(categoryInstances);
        }

        res.json(personality);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë përditësimit të personalitetit!' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const personality = await Personality.findByPk(id);
        if (!personality) {
            return res.status(404).json({ error: 'Personaliteti nuk u gjet!' });
        }

        await personality.destroy();
        res.json({ message: 'Personaliteti u fshi me sukses!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë fshirjes së personalitetit!' });
    }
});

module.exports = router;
