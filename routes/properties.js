const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const {
  getAll, create, update, get, remove, getVersions,
} = require('../services/properties/properties');

router.get('/', asyncHandler(async (req, res) => {
  const properties = await getAll();

  return res.json({
    error: false,
    data: properties,
  });
}));

router.post('/', asyncHandler(async (req, res) => {
  const value = await create(req.body);
  const statusCode = value.error === true ? 400 : 201;
  return res.status(statusCode).json({
    error: value.error,
    data: value.property,
    message: value.message,
  });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  try {
    const property = await get(req.params.id);
    res.status(200).json({
      error: false,
      data: property,
    });
  } catch (e) {
    res.status(404).json({
      error: true,
      message: `Did not find property with id ${req.params.id}`,
    });
  }
}));

router.get('/:id/versions', asyncHandler(async (req, res) => {
  const properties = await getVersions(req.params.id);
  if (properties.length === 0) {
    res.status(404).json({
      error: true,
      message: `Did not find property with id ${req.params.id}`,
    });
  } else {
    res.status(200).json({
      error: false,
      data: properties,
    });
  }
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const success = await update(req.params.id, req.body);
  if (success) {
    res.status(200).json({
      error: false,
      message: `Property ${req.params.id} has been updated`,
    });
  } else {
    res.status(400).json({
      error: true,
      message: `Could not update property with id ${req.params.id}`,
    });
  }
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const success = await remove(req.params.id);
  if (success) {
    res.status(200).json({
      error: false,
      message: `Property ${req.params.id} has been deleted`,
    });
  } else {
    res.status(400).json({
      error: true,
      message: `Property with id ${req.params.id} could not be deleted`,
    });
  }
}));

module.exports = router;
