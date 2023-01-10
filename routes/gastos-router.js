const express = require("express");
const business = require("../business/gastos");

const { v4: uuidv4 } = require("uuid");

const gastosRouter = express.Router();

gastosRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const gasto = await business.retrieveGastoById(id);
  res.send(gasto);
});

gastosRouter.post("/", async (req, res, next) => {
  const gasto = {
    id: uuidv4(),
    mes: req.body.mes,
    concepto: req.body.concepto,
    precio: req.body.precio,
  };
  await business.createGasto(gasto);
  res.send(gasto);
});

gastosRouter.put("/:id", async (req, res, next) => {
  const editId = req.params.id;
  const gastoEditado = {
    id: editId,
    mes: req.body.mes,
    concepto: req.body.concepto,
    precio: req.body.precio,
    estado: req.body.estado,
  };
  await business.updategasto(editId, gastoEditado);
  res.send(gastoEditado);
});

gastosRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  await business.deleteGasto(id);
  res.status(204).send();
});

gastosRouter.get("/", async (req, res, next) => {
  const gastos = await business.retrieveAllGastos();
  res.send(gastos);
});

module.exports = gastosRouter;
