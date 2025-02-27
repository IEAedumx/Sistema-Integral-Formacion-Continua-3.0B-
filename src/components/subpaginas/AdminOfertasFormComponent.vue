<template>
  <div>
    <h3>Ofertas de Formación</h3>
    <h4>Catálogo de Ofertas de Formación</h4>
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
    <b-button variant="success" @click="openModalOferta()"
      >Nueva Oferta</b-button
    >
    <b-button variant="danger">Tipos de Oferta</b-button>
    <b-button variant="warning" @click="reporteExcel()">Reporte .xlsx</b-button>
    <div>
      <b-table
        striped
        hover
        :items="ofertas"
        :busy="cargando"
        :fields="fields"
        :filter="filter"
      >
     

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
    <RegistroOfertaModal></RegistroOfertaModal>
    <RegistroGrupoModal></RegistroGrupoModal>
  </div>
</template>

<script>
import axios from "axios";
import RegistroOfertaModal from "../modals/registroOfertaModal";
import RegistroGrupoModal from "../modals/registroGrupoModal";
import Exceljs from "exceljs";

export default {
  name: "AdminOfertasFormComponent",
  components: { RegistroOfertaModal, RegistroGrupoModal },
  data() {
    return {
      ofertaSelected: false,
      grupoSelected: false,
      nombreOferta: "",
      idOferta: "",
      modalRegistroOferta: false,
      modalRegistroGrupo: false,
      env_url: process.env.VUE_APP_URL,
      filter: null,
      ofertas: [],
      cargando: false,
      fields: [
        {
          key: "img",
        },
        {
          key: "nombre",
          sortable: true,
        },
        {
          key: "show_details",
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    this.getOfertas();
  },
  methods: {
    getOfertas() {
      this.cargando = true;
      axios
        .get(this.env_url + "/ofertasFormacion", {
          headers: {
            Authorization: "bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          this.ofertas = res.data.ofertasFormacion;
          this.cargando = false;
        });
    },
    openModalGrupo(idOferta, nombreOferta, grupo = false) {
      this.idOferta = idOferta;
      this.nombreOferta = nombreOferta;
      if (grupo) {
        this.grupoSelected = {};
        Object.assign(this.grupoSelected, grupo);
        this.grupoSelected.cupo = grupo.cupo[0];
      } else {
        this.grupoSelected = false;
      }
      this.modalRegistroGrupo = true;
    },
    openModalOferta(oferta = false) {
      if (oferta) {
        this.ofertaSelected = {};
        Object.assign(this.ofertaSelected, oferta);
        this.ofertaSelected.institucion_formadora =
          oferta.institucion_formadora._id;
        this.ofertaSelected.nombre_curso = oferta.nombre_curso[0];
        this.ofertaSelected.modalidad = oferta.modalidad._id;
        this.ofertaSelected.presupuesto = oferta.presupuesto._id;
        //A modificar:
        this.ofertaSelected.tipo_oferta = oferta.tipo_oferta._id;
        
        let dirigido = oferta.dirigido;
        this.ofertaSelected.dirigido = [];
        for (let i in dirigido) {
          this.ofertaSelected.dirigido.push(dirigido[i]._id);
        }
      } else {
        this.ofertaSelected = false;
      }
      this.modalRegistroOferta = true;
    },
    reporteExcel() {
      axios
        .get(process.env.VUE_APP_URL + "/encode64/logo/iea_logo.jpg", {
          headers: {
            Authorization: "bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          const libro = new Exceljs.Workbook();
          const hoja1 = libro.addWorksheet("Hoja de prueba");
          const logoIEA = libro.addImage({
            base64filename: "img/img_logo.jpg",
            extension: res.data.ext,
            base64: res.data.cadena
          });
          hoja1.addImage(logoIEA, "A2:B7");
          hoja1.getCell("D4").font = {
            bold: true,
            size: 14,
          };
          hoja1.getCell("D4").value = "Catálogo de ofertas de formación";
          hoja1.getRow(9).values = [
            "id Oferta",
            "Nombre",
            "Periodo",
            "id Instancia",
            "Instancia",
          ];
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
    },
  },
};
</script>

<style>
b-col,
ul,
li a {
  cursor: pointer;
  color: blue;
}
</style>
