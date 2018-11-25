const express = require('express');
const { getAll, getVersions } = require('../services/properties/properties');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  const properties = await getAll();

  res.render('index', { title: 'Hostmaker', properties });
});

router.get('/property/:id', async (req, res) => {
  const properties = await getVersions(req.params.id);
  res.render('property', { title: 'View property', properties });
});

module.exports = router;
