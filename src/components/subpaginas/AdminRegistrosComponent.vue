<template>
  <div>
    <h3>Consulta y Administración de Registro</h3>
    <b-form-group label="Escribe un dato a Buscar:" label-for="filtro">
      <b-input-group>
        <b-form-input
          v-model="filtro"
          type="search"
          id="filtro"
          placeholder="Escribe un dato a Buscar"
        ></b-form-input>
        <b-input-group-append>
          <b-button @click="getRegistros" :disabled="buscando">Buscar</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <div>
      <strong>Registros encontrados {{ registros.length }}</strong>
    </div>
    <div>
      <strong>Registros seleccionados {{ registrosSelected.length }}</strong>
    </div>
    <div>
      <b-button variant="primary" @click="selectTodo" class="m-2"
        >Seleccionar todos</b-button
      >
      <b-button variant="primary" @click="clearSelect" class="m-2"
        >Limpiar selección</b-button
      >
      <b-button variant="success" @click="generarConstancia" class="m-2"
        >Generar constancia(s)</b-button
      >
    </div>
    <div>
      <b-table
        striped
        hover
        selectable
        ref="tablaRegistros"
        @row-selected="onSelected"
        :items="registros"
        :fields="fields"
        :select-mode="'multi'"
      >
        <template #cell(movs)="row">
          <b-button @click="editar(row.item)"
            ><b-icon icon="pencil" v-b-tooltip.hover title="Editar"></b-icon
          ></b-button>
        </template>
      </b-table>
    </div>
    <!--<RegistroUsuarioModal></RegistroUsuarioModal>-->
  </div>
</template>

<script>
const axios = require("axios").default;
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from "moment";
//import RegistroUsuarioModal from "../modals/registroUsuarioModal";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: "AdminRegistrosComponent",
  //components: {RegistroUsuarioModal},
  data: function () {
    return {
      filtro: "",
      buscando: false,
      registros: [],
      registrosSelected: [],
      modalRegistroUsuario: false,
      fields: [
        { key: "CURP", sortable: true },
        { key: "nombre_completo", sortable: true },
        "nombre_oferta",
        "grupo",
        "periodoFC",
        "resultado",
        { key: "_id" },
      ],
    };
  },
  methods: {
    selectTodo() {
      this.$refs.tablaRegistros.selectAllRows();
    },
    clearSelect() {
      this.$refs.tablaRegistros.clearSelected();
    },
    onSelected(items) {
      this.registrosSelected = items;
      console.log(items);
    },
    editar(registro) {
      console.log("Registro", registro);
      this.registroSelected = registro;
      //this.modalRegistroUsuario = true;
    },
    getRegistros() {
      this.buscando = true;
      axios
        .get(process.env.VUE_APP_URL + "/registros/vista/" + this.filtro, {
          headers: {
            Authorization: "bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.registros = res.data;
          this.buscando = false;
        });
    },
    async generarConstancia() {
      let img64Constancia = await axios.get(
        process.env.VUE_APP_URL + "/encode64/logo/constancia 2020.png",
        {
          headers: {
            Authorization: "bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      console.log(img64Constancia);
      if (this.registrosSelected.length > 0) {
        const constanciaDef = {
          pageSize: "LETTER",
          watermark: {
            // text: 'DOCUMENTO DE PRUEBA'
          },
          layout: "noBorders",
          background: [
            {
              image: img64Constancia.data.cadena,
              width: 616,
              height: 856,
            },
          ],
          content: [],
          styles: {
            iea: {
              fontSize: 20,
              color: "#181c52",
              alignment: "center",
              bold: false,
              italics: false,
            },
            leyenda: {
              fontSize: 14,
              color: "#8A8A8A",
              alignment: "center",
              bold: false,
              italics: false,
            },
            leyenda1: {
              fontSize: 14,
              color: "#181c52",
              alignment: "center",
              bold: false,
              italics: false,
            },
            nombre: {
              fontSize: 22,
              alignment: "center",
              color: "#2BADC3",
              bold: true,
              italics: true,
            },
            firma: {
              fontSize: 11,
              color: "#181c52",
              bold: false,
              italics: false,
              alignment: "center",
            },
            firmaBold: {
              fontSize: 11,
              color: "#181c52",
              bold: true,
              italics: false,
              alignment: "center",
            },
          },
        };
        for (let idx in this.registrosSelected) {
          if (this.registrosSelected[idx].resultado == "CONCLUIDO") {
            let registro = this.registrosSelected[idx];
            const img64Instancia = await axios.get(
              process.env.VUE_APP_URL + "/encode64/logo/" + registro.img,
              {
                headers: {
                  Authorization: "bearer " + sessionStorage.getItem("token"),
                },
              }
            );
            constanciaDef.content.push([
              {
                table: {
                  heights: [105, 45, 45, 30, 40, 30],
                  widths: [520],
                  body: [
                    [
                      {
                        text: "",
                      },
                    ],
                    [
                      {
                        text: "", //EL INSTITUTO DE EDUCACIÓN \nDE AGUASCALIENTES\n\n
                        style: "iea",
                      },
                    ],
                    [
                      {
                        // tslint:disable-next-line: max-line-length
                        text: "El Instituto de Educación de Aguascalientes, a través de la \nDirección de Carrera del Magisterio, otorga la presente\n\n\n",
                        style: "leyenda",
                      },
                    ],
                    [
                      {
                        text: "",
                      },
                    ],
                    [
                      {
                        text: "",
                      },
                    ],
                    [
                      {
                        text: "A: " + registro.nombre_completo + "\n\n",
                        style: "nombre",
                      },
                    ],
                    [
                      {
                        text: "",
                      },
                    ],
                    [
                      {
                        text: "",
                      },
                    ],
                    [
                      {
                        text: `Por su participación en ${registro.tipo_oferta}:`,
                        style: "leyenda",
                      },
                    ],
                  ],
                },
                layout: "noBorders",
              },
              {
                table: {
                  heights: [10],
                  widths: [10, 500, 10],
                  body: [
                    [
                      [""], //Celda vacía
                      [{
                        // tslint:disable-next-line: max-line-length
                       text: `“${registro.nombre_oferta}”\nCon una duración de ${
                          registro.horas
                        } horas, impartido en el periodo ${moment(
                          registro.fecha_ini
                        )
                          .locale("es")
                          .utc()
                          .format("LL")} al ${moment(registro.fecha_fin)
                          .locale("es")
                          .utc()
                          .format(
                            "LL"
                          )}, correspondiente a las Acciones de Formación Continua, Actualización y Desarrollo Profesional en la Educación Básica\n2024.`,
                        style: "leyenda1",
                     },],
                     [""] //Celda vacía
                    ]
                  ],
                },
                layout: "noBorders",
              },
              {
                table: {
                  heights: [105],
                  widths: [260, 260],
                  body: [
                    [
                      [
                        {
                          text: `\n\n\n\nDra. Gabriela Rocha Colis`,
                          style: "firmaBold",
                        },
                        {
                          // tslint:disable-next-line: max-line-length
                          text: `Directora de Carrera del Magisterio`,
                          style: "firma",
                        },
                      ],
                      [
                        {
                          text: `\n\n\n\n${registro.firmante_inst}`,
                          style: "firmaBold",
                        },
                        {
                          // tslint:disable-next-line: max-line-length
                          text: `${registro.cargo_firmante_inst}`,
                          style: "firma",
                        },
                      ],
                    ],
                  ],
                },
                layout: "noBorders",
              },
              {
                table: {
                  heights: [30],
                  widths: [40, 173, 118, 173, 15],
                  body: [
                    [
                      [""], //Celda vacía
                      [
                        {
                          qr: `http://sifc.iea.edu.mx/valida/${registro._id}`,
                          fit: "80",
                        },
                      ],
                      [""], //Celda vacía
                      [
                        {
                          image: img64Instancia.data.cadena,
                          width: 80,
                        },
                      ],
                      [""], //Celda vacía
                    ],
                  ],
                },
                layout: "noBorders",
              },
            ]);
            if (idx < this.registrosSelected.length - 1) {
              constanciaDef.content.push([{ text: "", pageBreak: "after" }]);
            }
          }
        }
        pdfMake.createPdf(constanciaDef).open({}, window.open("", "_blank"));
      }
    },
  },
};
</script>