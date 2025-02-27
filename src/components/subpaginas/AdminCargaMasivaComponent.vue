<template>
  <div>
    <h2>Movimientos masivos por layout.</h2>
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Elije un archivo para regitro o arrastralo aquí..."
      drop-placeholder="Arrastra el arvhivo aquí..."
      @input="cargaRegistrosExcel()"
    ></b-form-file>
    <div>
      <b-table striped hover :items="datosJSON"></b-table>
    </div>
    <div>
      <b-button
        class="m-2"
        variant="success"
        :disabled="datosJSON.length <= 0"
        @click="registrar"
        >Registrar</b-button
      >
      <b-button
        class="m-2"
        variant="primary"
        :disabled="datosJSON.length <= 0"
        @click="registraResultados"
        >Reg. Resultados</b-button
      >
      <b-button
        class="m-2"
        variant="danger"
        :disabled="datosJSON.length <= 0"
        @click="eliminar"
        >Eliminar</b-button
      >
    </div>
  </div>
</template>

<script>
import Excel from "exceljs";
import axios from "axios";

export default {
  name: "AdminCargaMasivaComponent",
  data() {
    return {
      file1: null,
      datosJSON: [],
      modelo: {},
    };
  },
  methods: {
    registraResultados() {
      this.datosJSON.forEach((el) => {
        if (el.idRegistro && el.resultado) {
          axios
            .put(
              process.env.VUE_APP_URL + "/registros/resultado/" + el.idRegistro,
              el,
              {
                headers: {
                  Authorization: "bearer " + sessionStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              el.resultado_carga = res.data;
            });
        } else {
          el.resultado_carga =
            "Error: Revisar layout, requiere campos: idRegistro y resultado";
        }
      });
    },
    eliminar() {
      this.datosJSON.forEach((el) => {
        if (el.idEliminar) {
          axios
            .delete(process.env.VUE_APP_URL + "/registros/delete/" + el._id, {
              headers: {
                Authorization: "bearer " + sessionStorage.getItem("token"),
              },
            })
            .then((res) => {
              el.resultado_carga = res.data;
            });
        } else {
          el.resultado_carga =
            "Error: Revisar layout, requiere campo: idEliminar";
        }
      });
    },
    registrar() {
      this.datosJSON.forEach((el) => {
        axios
          .post(process.env.VUE_APP_URL + "/registros/admin/registro", el, {
            headers: {
              Authorization: "bearer " + sessionStorage.getItem("token"),
            },
          })
          .then((res) => {
            el.resultado_carga = res.data;
          });
      });
    },
    async cargaRegistrosExcel() {
      console.log(this.file1);
      const libro = new Excel.Workbook();
      const reader = new FileReader();

      this.datosJSON = [];
      this.modelo = {};

      reader.readAsArrayBuffer(this.file1);

      reader.onload = () => {
        const buffer = reader.result;
        libro.xlsx.load(buffer).then((workbook) => {
          workbook.worksheets[0].eachRow((row, rowIndex) => {
            if (rowIndex > 1) {
              workbook.worksheets[0].getRow(1).eachCell((celda, cellIndex) => {
                this.modelo[celda.value] = row.values[cellIndex];
                this.modelo.resultado_carga = "NA";
              });
              this.datosJSON.push(JSON.parse(JSON.stringify(this.modelo)));
            }
          });
        });
      };
    },
  },
};
</script>