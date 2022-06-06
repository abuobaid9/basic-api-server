'use strict';
const express = require('express');

const { Clothe } = require('../models/index');

const clothesRouter = express.Router();

//add routes here
clothesRouter.get('/clothe', getClothes);
clothesRouter.get('/clothe/:id', getOneClothe);
clothesRouter.post('/clothe', createClothe);
clothesRouter.put('/clothe/:id', updateClothe);
clothesRouter.delete('/clothe/:id', deleteClothe);

async function getClothes(req, res) {
  const clothes = await Clothe.findAll();
  res.status(200).json(clothes);
}
async function getOneClothe(req, res) {
  const clotheId = parseInt(req.params.id);
  let clothe = await Clothe.findOne({ where: { id: clotheId } });
  res.status(200).json(clothe);
}
async function createClothe(req, res) {
  let newClothe = req.body;
  let clothe = await Clothe.create(newClothe);
  res.status(201).json(clothe);
}
async function updateClothe(req, res) {
  let clotheId = parseInt(req.params.id);
  let updateClothe = req.body;
  let foundClothe = await Clothe.findOne({ where: { id: clotheId } });
  if (foundClothe) {
    let updatedClothe = await foundClothe.update(updateClothe);
    res.status(201).json(updatedClothe);
  } else {
    res.status(404);
  }
}
async function deleteClothe(req, res) {
  let clotheId = parseInt(req.params.id);
  let deleteClothe = await Clothe.destroy({ where: { id: clotheId } });
  res.status(204).json(deleteClothe);
}
module.exports = clothesRouter;