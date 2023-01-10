const repository = require("../repositories/files-repository");

const retrieveGastoById = async (id) => {
  const gastosList = await repository.retrieve("gastos");
  let result;
  gastosList.forEach((gasto) => {
    if (id === gasto.id) {
      result = gasto;
    }
  });
  return result;
};

const createGasto = async (gasto) => {
  const gastosList = await repository.retrieve("gastos");
  gastosList.push(gasto);
  await repository.save("gastos", gastosList);
  return;
};

const updategasto = async (id, data) => {
  const gastosList = await repository.save("gastos");

  for (let i = 0; i < gastosList.length; i++) {
    if (gastosList[i].id === editId) {
      gastosList[i] = gastoEditado;
    }
  }
  await repository.save("gastos", gastosList);
};

const deleteGasto = async (id) => {
  const gastosList = await repository.retrieve("gastos");
  for (let i = 0; i < gastosList.length; i++) {
    if (id === gastosList[i].id) {
      gastosList.splice(i, 1);
    }
  }
  await repository.save("gastos", gastosList);
};

const retrieveAllGastos = async () => {
  return await repository.retrieve("gastos");
};

module.exports = {
  retrieveGastoById,
  createGasto,
  updategasto,
  deleteGasto,
  retrieveAllGastos,
};
