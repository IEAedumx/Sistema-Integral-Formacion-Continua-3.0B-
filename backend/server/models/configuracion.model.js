const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConfiguracionSchema = new Schema({
    "limites_reg_periodo": Array,
})

module.exports = mongoose.model("configuracion", ConfiguracionSchema, "configuracion");