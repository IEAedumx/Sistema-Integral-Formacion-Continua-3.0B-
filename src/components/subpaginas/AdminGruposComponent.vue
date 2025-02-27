<template>
  <div>
    <h3>Grupos en ofertas</h3>
    <h4>Catálogo de Grupos</h4>
    <hr />
    <b-form-group label="Filtro:" label-for="filterInput">
      <b-input-group>
        <b-form-input
          v-model="filter"
          type="search"
          id="filterInput"
          placeholder="Escribe un dato a filtrar"
        ></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Limpiar</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <div>
      <b-table
        striped
        hover
        :items="grupos"
        :busy="cargando"
        :fields="fields"
        :filter="filter"
      >
        <template #cell(lista)="row">
          <b-button variant="success" @click="getLista(row.item)"
            ><b-icon icon="card-list" aria-hidden="true"></b-icon
            >Lista</b-button
          >
        </template>
        <template #cell(base)="row">
          <b-button variant="primary" @click="getBase(row.item)"
            ><b-icon icon="card-list" aria-hidden="true"></b-icon
            >Base</b-button
          >
        </template>
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Cargando...</strong>
          </div>
        </template>
        <template v-slot:cell(img)="row">
          <img
            height="auto"
            width="100px"
            :src="
              env_url +
              '/backassets/logos/' +
              row.item.institucion_formadora.img
            "
          />
        </template>
        <template #cell(nombre)="row">
          {{ row.item.nombre_curso[0] }}
        </template>
        <template #cell(show_details)="row">
          <b-button size="sm" class="mr-2" @click="row.toggleDetails">
            {{ row.detailsShowing ? "Ocultar" : "Mostrar" }} Detalles
          </b-button>
        </template>
        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Id:</b></b-col>
              <b-col>{{ row.item._id }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Grupos:</b></b-col>
              <b-col>
                <ul>
                  <li v-for="grupo in row.item.grupos" :key="grupo.key">
                    <button
                      v-on:click="
                        openModalGrupo(
                          row.item._id,
                          row.item.nombre_curso[0],
                          grupo
                        )
                      "
                    >
                      {{ grupo.grupo + " / " + grupo.observacion }}
                    </button>
                  </li>
                </ul>
              </b-col>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails"
              >Ocultar Detalles</b-button
            >
            <b-button class="m-3" size="sm" @click="openModalOferta(row.item)"
              >Editar</b-button
            >
            <b-button
              size="sm"
              @click="openModalGrupo(row.item._id, row.item.nombre_curso[0])"
              >Abrir Grupo</b-button
            >
          </b-card>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Exceljs from "exceljs";

export default {
  name: "AdminGruposComponent",
  data() {
    return {
      cargando: true,
      grupos: [],
      filter: null,
      fields: [
        {
          key: "lista",
          label: "Listas",
        },
        {
          key: "base",
          label: "Bases",
        },
        {
          key: "nombre_curso",
          sortable: true,
        },
        {
          key: "fecha_ini",
          sortable: true,
        },
        {
          key: "fecha_fin",
          sortable: true,
        },
        {
          key: "periodoFC",
          sortable: true,
        },
        {
          key: "estatus",
          sortable: true,
        },
        {
          key: "cupo",
          sortable: true,
        },
        {
          key: "contRegistrados",
          sortable: true,
          label: "Registrados",
        },
        {
          key: "idGrupo",
          sortable: true,
          label: "idGrupo",
        },
        {
          key: "_id",
          sortable: true,
          label: "idOferta",
        },
      ],
    };
  },
  mounted() {
    this.getGrupos();
  },
  methods: {
    getGrupos() {
      axios
        .get(process.env.VUE_APP_URL + "/getGrupos", {
          headers: {
            Authorization: "bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.grupos = res.data;
          console.log(res.data);
          this.cargando = false;
        });
    },
    getBase(item) {
      console.log(item);
      axios
        .get(
          process.env.VUE_APP_URL + "/registros/grupoLista/" + item.idGrupo,
          {
            headers: {
              Authorization: "bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          const libro = new Exceljs.Workbook();
          const hoja1 = libro.addWorksheet("Registrados");

          /*****************  Registros lista */
          hoja1.addRow(Object.keys(res.data[0]));
          res.data.forEach((element, idx) => {
            idx;
            console.log(element.values);
            hoja1.addRow(Object.values(element));
          });
          /***************  Genera archivo y descarga  */
          libro.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            console.log(anchor.href);
            anchor.href = url;
            anchor.download = "base_de_datos.xlsx";
            anchor.click();
            window.URL.revokeObjectURL(url);
          });
        });
    },
    getLista(item) {
      console.log(item);
      axios
        .get(
          process.env.VUE_APP_URL + "/registros/grupoLista/" + item.idGrupo,
          {
            headers: {
              Authorization: "bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          axios
            .get(
              process.env.VUE_APP_URL + "/encode64/logo/" + res.data[0].img,
              {
                headers: {
                  Authorization: "bearer " + sessionStorage.getItem("token"),
                },
              }
            )
            .then((img64Instancia) => {
              axios
                .get(
                  process.env.VUE_APP_URL + "/encode64/logo/iea_horizontal.jpg",
                  {
                    headers: {
                      Authorization:
                        "bearer " + sessionStorage.getItem("token"),
                    },
                  }
                )
                .then((img64IEA) => {
                  //***********  Bordes var */
                  let bordes = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                  };
                  const libro = new Exceljs.Workbook();
                  const hoja1 = libro.addWorksheet("Lista de asistencia");

                  /*************** Logos  */
                  const logoInstancia = libro.addImage({
                    base64filename: "img/img_logo.jpg",
                    extension: img64Instancia.data.ext,
                    base64: img64Instancia.data.cadena,
                  });
                  hoja1.addImage(logoInstancia, "A2:B3");
                  const logoIEA = libro.addImage({
                    base64filename: "img/img_logo.jpg",
                    extension: img64IEA.data.ext,
                    base64: img64IEA.data.cadena,
                  });
                  hoja1.addImage(logoIEA, "O2:Q4");

                  /*****************   Ancho de columnas */
                  hoja1.getColumn(1).width = 4;
                  hoja1.getColumn(2).width = 50;
                  hoja1.getColumn(3).width = 23;
                  hoja1.getColumn(4).width = 8;
                  hoja1.getColumn(5).width = 20;
                  hoja1.getColumn(6).width = 4;
                  hoja1.getColumn(7).width = 4;
                  hoja1.getColumn(8).width = 4;
                  hoja1.getColumn(9).width = 4;
                  hoja1.getColumn(10).width = 4;
                  hoja1.getColumn(11).width = 4;
                  hoja1.getColumn(12).width = 4;
                  hoja1.getColumn(13).width = 4;
                  hoja1.getColumn(14).width = 10;
                  hoja1.getColumn(15).width = 10;
                  hoja1.getColumn(16).width = 10;
                  hoja1.getColumn(17).width = 10;
                  hoja1.getRow(13).height = 40;
                  hoja1.getCell("D2").value =
                    "DIRECCION DE CARRERA DEL MAGISTERIO";
                  hoja1.getCell("D2").font = {
                    bold: true,
                    size: 14,
                  };
                  hoja1.getCell("D3").value =
                    "DEPARTAMENTO DE FORMACION PROFESIONAL DEL MAGISTERIO";
                  hoja1.getCell("A6").value =
                    "NOMBRE DE LA OFERTA FORMATIVA: " + res.data[0].oferta;
                  hoja1.getCell("A7").value =
                    "TIPO DE OFERTA: " + res.data[0].tipo_oferta;
                  hoja1.getCell("A8").value =
                    "FECHA: DEL " +
                    res.data[0].fecha_inicio +
                    " AL " +
                    res.data[0].fecha_fin;
                  hoja1.getCell("A9").value = "SEDE: " + res.data[0].sede;
                  hoja1.getCell("A10").value = "NOMBRE DEL FACILITADOR(A):";
                  //hoja1.getCell("G6").value = "LINEA DE FORMACION:";
                  hoja1.getCell("G7").value = "GRUPO: " + res.data[0].grupo;
                  hoja1.getCell("G8").value =
                    "TURNO: " + res.data[0].modalidad_oferta;
                  hoja1.getCell("G9").value =
                    "MODALIDAD: " + res.data[0].modalidad_oferta;
                  hoja1.getCell("N13").alignment = { wrapText: true };
                  hoja1.getCell("O13").alignment = { wrapText: true };
                  hoja1.getCell("P13").alignment = { wrapText: true };
                  hoja1.getCell("Q13").alignment = { wrapText: true };
                  /*************      Encabezados   */
                  hoja1.mergeCells("F12", "M12");
                  hoja1.getCell("F12").value = "SESIONES";
                  hoja1.getCell("F12").border = bordes;
                  hoja1.getRow(13).values = [
                    "N°",
                    "NOMBRE",
                    "CURP",
                    "GENERO",
                    "FUNCION",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "% ASISTENCIA",
                    "N° PRODUCTOS ENTREGADOS",
                    "CALIFICACION",
                    "EFICIENCIA TERMINAL",
                  ];
                  hoja1.getCell("A13").border = bordes;
                  hoja1.getCell("B13").border = bordes;
                  hoja1.getCell("C13").border = bordes;
                  hoja1.getCell("D13").border = bordes;
                  hoja1.getCell("E13").border = bordes;
                  hoja1.getCell("F13").border = bordes;
                  hoja1.getCell("G13").border = bordes;
                  hoja1.getCell("H13").border = bordes;
                  hoja1.getCell("I13").border = bordes;
                  hoja1.getCell("J13").border = bordes;
                  hoja1.getCell("K13").border = bordes;
                  hoja1.getCell("L13").border = bordes;
                  hoja1.getCell("M13").border = bordes;
                  hoja1.getCell("N13").border = bordes;
                  hoja1.getCell("O13").border = bordes;
                  hoja1.getCell("P13").border = bordes;
                  hoja1.getCell("Q13").border = bordes;
                  /*****************  Validaciones   */
                  let asistenciaValidacion = {
                    type: "list",
                    allowBlank: true,
                    formulae: ['"/,*"'],
                  };
                  let eficienciaValidacion = {
                    type: "list",
                    allowBlank: true,
                    formulae: ['"CONCLUIDO, NO CONCLUIDO"'],
                  };
                  let porcentajeValidacion = {
                    type: "decimal",
                    operator: "between",
                    allowBlank: true,
                    showInputMessage: true,
                    formulae: [0, 100],
                    promptTitle: "Decimal",
                    prompt: "El valor debe estar entre 0 y 100",
                  };
                  /*****************  Registros lista */
                  res.data.forEach((element, idx) => {
                    console.log("idx", idx + 14, element);
                    hoja1.getCell("A" + (idx + 14)).value = idx + 1;
                    hoja1.getCell("A" + (idx + 14)).border = bordes;
                    hoja1.getCell("B" + (idx + 14)).value =
                      element.nombre_completo;
                    hoja1.getCell("B" + (idx + 14)).border = bordes;
                    hoja1.getCell("C" + (idx + 14)).value = element.curp;
                    hoja1.getCell("C" + (idx + 14)).border = bordes;
                    hoja1.getCell("D" + (idx + 14)).value = element.genero;
                    hoja1.getCell("D" + (idx + 14)).border = bordes;
                    hoja1.getCell("E" + (idx + 14)).value = element.funcion;
                    hoja1.getCell("E" + (idx + 14)).border = bordes;

                    hoja1.getCell("F" + (idx + 14)).border = bordes;
                    hoja1.getCell(
                      "F" + (idx + 14)
                    ).dataValidation = asistenciaValidacion;
                    hoja1.getCell("G" + (idx + 14)).border = bordes;
                    hoja1.getCell(
                      "G" + (idx + 14)
                    ).dataValidation = asistenciaValidacion;
                    hoja1.getCell("H" + (idx + 14)).border = bordes;
                    hoja1.getCell(
                      "H" + (idx + 14)
                    ).dataValidation = asistenciaValidacion;
                    hoja1.getCell("I" + (idx + 14)).border = bordes;
                    hoja1.getCell(
                      "I" + (idx + 14)
                    ).dataValidation = asistenciaValidacion;
                    hoja1.getCell("J" + (idx + 14)).border = bordes;
                    hoja1.getCell(
                      "J" + (idx + 14)
                    ).dataValidation = asistenciaValidacion;
                    hoja1.getCell("K" + (idx + 14)).border = bordes;
                    hoja1.getCell(
                      "K" + (idx + 14)
                    ).dataValidation = asistenciaValidacion;
                    hoja1.getCell("L" + (idx + 14)).border = bordes;
                    hoja1.getCell(
                      "L" + (idx + 14)
                    ).dataValidation = asistenciaValidacion;
                    hoja1.getCell("M" + (idx + 14)).border = bordes;
                    hoja1.getCell(
                      "M" + (idx + 14)
                    ).dataValidation = asistenciaValidacion;
                    hoja1.getCell("N" + (idx + 14)).border = bordes;
                    hoja1.getCell(
                      "N" + (idx + 14)
                    ).dataValidation = porcentajeValidacion;
                    hoja1.getCell("O" + (idx + 14)).border = bordes;
                    hoja1.getCell("P" + (idx + 14)).border = bordes;
                    hoja1.getCell(
                      "P" + (idx + 14)
                    ).dataValidation = porcentajeValidacion;
                    hoja1.getCell("Q" + (idx + 14)).border = bordes;
                    hoja1.getCell(
                      "Q" + (idx + 14)
                    ).dataValidation = eficienciaValidacion;
                  });
                  console.log(res.data.length);
                  hoja1.getCell("B" + (res.data.length + 24)).value =
                    "NOMBRE Y FIRMA DEL FACILITADOR(A)";
                  hoja1.getCell("C" + (res.data.length + 24)).value =
                    "NOMBRE Y FIRMA RESPONSABLE DE LA INSTANCIA";
                  hoja1.getCell("G" + (res.data.length + 24)).value =
                    "JEFE DEL DEPARTAMENTO DE FORMACION PROFESIONAL DEL MAGISTERIO";
                  hoja1.getCell("G" + (res.data.length + 25)).value =
                    "ING. JUAN FRANCISCO DIAZ CHAVEZ";
                  /***************  Genera archivo y descarga  */
                  libro.xlsx.writeBuffer().then(function (data) {
                    const blob = new Blob([data], {
                      type:
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    });
                    const url = window.URL.createObjectURL(blob);
                    const anchor = document.createElement("a");
                    console.log(anchor.href);
                    anchor.href = url;
                    anchor.download = "download.xlsx";
                    anchor.click();
                    window.URL.revokeObjectURL(url);
                  });
                });
            });
        });
    },
  },
};
</script>