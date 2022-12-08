const express = require("express");
const filesMethods = require("../files-functions/files-methods");
const { v4: uuidv4 } = require("uuid");

const gastosRouter = express.Router();

gastosRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const gastosList = await filesMethods.readFilePromise("gastos");

  gastosList.forEach((gasto) => {
    if (id === gasto.id) {
      res.send(gasto);
      return;
    }
  });
});

gastosRouter.post("/", async (req, res, next) => {
  const gasto = {
    id: uuidv4(),
    mes: req.body.mes,
    concepto: req.body.concepto,
    precio: req.body.precio,
  };
  const gastosList = await filesMethods.readFilePromise("gastos");
  gastosList.push(gasto);
  await filesMethods.writeFilePromise("gastos", gastosList);
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
  const gastosList = await filesMethods.readFilePromise("gastos");

  for (let i = 0; i < gastosList.length; i++) {
    if (gastosList[i].id === editId) {
      gastosList[i] = gastoEditado;
    }
  }
  await filesMethods.writeFilePromise("gastos", gastosList);
  res.send(gastoEditado);
});

gastosRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const gastosList = await filesMethods.readFilePromise("gastos");
  for (let i = 0; i < gastosList.length; i++) {
    if (id === gastosList[i].id) {
   gastosList.splice(i, 1);
    }
  }
  await filesMethods.writeFilePromise("gastos", gastosList);
  res.status(204).send();
});

gastosRouter.get("/", async (req, res, next) => {
  const gastosList = await filesMethods.readFilePromise("gastos");
  res.send(gastosList);
});

module.exports = gastosRouter;
