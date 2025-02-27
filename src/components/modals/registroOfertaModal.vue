<template>
  <div>
    <b-modal
      @show="onOpenModal()"
      v-model="$parent.modalRegistroOferta"
      id="modalRegistroOferta"
      title="Oferta de Formación"
      ok-only
      ok-variant="danger"
      ok-title="Cancelar"
    >
      <div class="col">
        <b-form @submit="submitForm()" onsubmit="return false">
          <!--------Campo instancias------>
          <b-form-group
            label="Instancia:"
            label-for="instancia"
            description="Elige la instancia a la que pertenece"
          >
            <b-form-select
              id="instancia"
              v-model="oferta.institucion_formadora"
            >
              <b-form-select-option
                v-for="instancia in instancias"
                :key="instancia.index"
                :value="instancia._id"
                >{{ instancia.nombre }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
          <!---------Campo clave------->
          <b-form-group
            label="*Clave:"
            label-for="clave"
            description="Clave insterna para identificación"
          >
            <b-form-input
              placeholder="Escribe un texto"
              required
              id="clave"
              v-model="oferta.clave"
              :state="!(oferta.clave == '')"
            ></b-form-input>
          </b-form-group>
          <!---------Campo nombre------->
          <b-form-group
            label="*Nombre:"
            label-for="nombre"
            description="Verifica que el nombre este escrito correctamente"
          >
            <b-form-input
              placeholder="Nombre de Oferta"
              required
              id="nombre"
              v-model="oferta.nombre_curso"
              :state="!(oferta.nombre_curso == '')"
            ></b-form-input>
          </b-form-group>
          <!--------Campo costo por registro ------>
          <b-form-group
            label="Costo x registro:"
            label-for="costo_por_registro"
            description="Escribe una cantidad en MN"
          >
            <b-form-input
              placeholder="Escribe una cantidad"
              id="costo_por_registro"
              v-model="oferta.costo_por_registro"
              type="number"
            ></b-form-input>
          </b-form-group>
          <!--------Campo  cupo------>
          <b-form-group
            label="Cupo:"
            label-for="cupo"
            description="Cantidad de lugares disponibles"
          >
            <b-form-input
              placeholder="Escribe una cantidad entera"
              id="cupo"
              v-model="oferta.cupo"
              type="number"
            ></b-form-input>
          </b-form-group>
          <!--------Campo modalidades------>
          <b-form-group
            label="Modalidad:"
            label-for="modalidad"
            description="Elige la modalidad"
          >
            <b-form-select id="modalidad" v-model="oferta.modalidad">
              <b-form-select-option
                v-for="modalidad in modalidades"
                :key="modalidad.index"
                :value="modalidad._id"
                >{{ modalidad.nombre }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
          <!--------Campo tipos de oferta------>
          <b-form-group
            label="Tipo de oferta:"
            label-for="tiposOferta"
            description="Elige el tipo de oferta"
          >
            <b-form-select id="tiposOferta" v-model="oferta.tipo_oferta">
              <b-form-select-option
                v-for="oferta in tiposOferta"
                :key="oferta.index"
                :value="oferta._id"
                >{{
                  oferta.descripcion
                }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
          <!--------Campo presupuestos------>
          <b-form-group
            label="Presupuesto:"
            label-for="presupuesto"
            description="Elije el origen del recurso"
          >
            <b-form-select id="presupuesto" v-model="oferta.presupuesto">
              <b-form-select-option
                v-for="presupuesto in presupuestos"
                :key="presupuesto.index"
                :value="presupuesto._id"
                >{{ presupuesto.sostenimiento }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
          <!--------Campo descripcion------>
          <b-form-group
            label="*Descripción:"
            label-for="descripcion"
            description="Breve descripción de la oferta"
          >
            <b-form-input
              id="descipcion"
              placeholder="Escribe un téxto breve"
              required
              v-model="oferta.descripcion"
            ></b-form-input>
          </b-form-group>
          <!--------Campo dirigido------>
          <b-form-group
            label="Dirigido a:"
            label-for="dirigido"
            description="Elige los niveles a quienes va dirigido"
          >
            <b-form-select multiple id="tipo" v-model="oferta.dirigido">
              <b-form-select-option
                v-for="nivel in niveles"
                :key="nivel.index"
                :value="nivel._id"
                >{{ nivel.nombre }}</b-form-select-option
              >
            </b-form-select>
            <strong>Selección: </strong>
            <p>{{ oferta.dirigido }}</p>
          </b-form-group>
          <!----------------- Campo fecha de inicio -------->
          <div>
            <label for="fecha_ini">Fecha de inicio</label>
            <b-form-datepicker
              id="fecha_ini"
              v-model="oferta.fecha_ini"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <!----------------- Campo fecha de termino -------->
          <div>
            <label for="fecha_fin">Fecha de término</label>
            <b-form-datepicker
              id="fecha_fin"
              v-model="oferta.fecha_fin"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <!----------------- Campo estatus -------->
          <b-form-group
            label="Estado de la oferta:"
            label-for="estatus"
            description="Estado de la oferta"
          >
            <b-form-select
              id="estatus"
              v-model="oferta.estatus"
              :options="opsEstatus"
            ></b-form-select>
          </b-form-group>
          <!---------Campo periodoFC------->
          <b-form-group
            label="*Periodo:"
            label-for="periodo"
            description="Peridio de capacitación"
          >
            <b-form-input
              placeholder="Escribe un texto"
              required
              id="periodo"
              v-model="oferta.periodoFC"
              :state="!(oferta.periodoFC == '')"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" v-if="!registrando">Guardar</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistroOfertaModal",
  data() {
    return {
      registrando: false,
      axiosProp: {
        headers: {
          Authorization: "bearer " + sessionStorage.getItem("token"),
        },
      },
      instancias: [],
      niveles: [],
      modalidades: [],
      tiposOferta: [],
      presupuestos: [],
      selectedFile: null,
      opsEstatus: [
        { value: "INSCRIPCION ABIERTA", text: "Inscripción Abierta" },
        { value: "EN CURSO", text: "En curso" },
        { value: "CANCELADO", text: "Cancelado" },
        { value: "CERRADO", text: "Cerrado" },
        { value: "ACTIVO", text: "Activo" },
        { value: "INACTIVO", text: "Inactivo" },
        { value: "SUSPENDIDO", text: "Suspendido" },
        { value: "SIN CUPO", text: "Sin Cupo" },
        { value: "DISPONIBLE", text: "Disponible" },
      ],
      oferta: {
        clave: "",
        nombre_curso: "",
        costo_por_registro: "",
        cupo: "",
        descripcion: "",
        dirigido: [],
        fecha_fin: "",
        fecha_ini: "",
        sede: "",
        estatus: "",
        facilitador: "",
        institucion_formadora: "",
        periodoFC: "",
        modalidad: "",
        tipo_oferta: "",
        presupuesto: "",
      },
    };
  },
  mounted() {
    this.getInstancias();
    this.getNiveles();
    this.getTiposModPres();
  },
  methods: {
    submitForm() {
      this.registrando = true;
      if (this.$parent.ofertaSelected) {
        axios
          .put(
            process.env.VUE_APP_URL + "/ofertasFormacion/" + this.oferta._id,
            this.oferta,
            this.axiosProp
          )
          .then((res) => {
            console.log(res);
            this.registrando = false;
            this.$parent.modalRegistroOferta = false;
            this.$bvModal.msgBoxOk("Oferta registrada con éxito");
            this.$parent.getOfertas();
          })
          .catch((err) => {
            console.log(err);
            this.registrando = false;
            this.$parent.modalRegistroOferta = false;
          });
      } else {
        axios
          .post(
            process.env.VUE_APP_URL + "/ofertasFormacion",
            this.oferta,
            this.axiosProp
          )
          .then((res) => {
            console.log(res);
            this.registrando = false;
            this.$parent.modalRegistroOferta = false;
            this.$bvModal.msgBoxOk("Oferta registrada con éxito");
            this.$parent.getOfertas();
          })
          .catch((err) => {
            console.log(err);
            this.registrando = false;
            this.$parent.modalRegistroOferta = false;
          });
      }
    },
    getNiveles() {
      axios
        .get(process.env.VUE_APP_URL + "/nivelesEducativos", this.axiosProp)
        .then((res) => {
          this.niveles = res.data.nivelesEducativos;
          console.log(this.niveles);
        });
    },
    getInstancias() {
      axios
        .get(
          process.env.VUE_APP_URL + "/institucionesFormadoras",
          this.axiosProp
        )
        .then((res) => {
          this.instancias = res.data;
          console.log(res);
        });
    },
    getTiposModPres() {
      axios
        .get(process.env.VUE_APP_URL + "/tiposOferta", this.axiosProp)
        .then((res) => {
          this.tiposOferta = res.data.tiposOferta;
          console.log(res);
        });
      axios
        .get(process.env.VUE_APP_URL + "/presupuestos", this.axiosProp)
        .then((res) => {
          this.presupuestos = res.data.presupuestos;
          console.log(res);
        });
      axios
        .get(process.env.VUE_APP_URL + "/modalidades", this.axiosProp)
        .then((res) => {
          this.modalidades = res.data.modalidades;
          console.log(res);
        });
    },
    onOpenModal() {
      if (this.$parent.ofertaSelected) {
        this.oferta = this.$parent.ofertaSelected;
      } else {
        this.oferta = {
          clave: "",
          nombre_curso: "",
          costo_por_registro: "",
          cupo: "",
          descripcion: "",
          dirigido: [],
          fecha_fin: "",
          fecha_ini: "",
          sede: "",
          estatus: "",
          facilitador: "",
          institucion_formadora: "",
          periodoFC: "",
          modalidad: "",
          tipo_oferta: "",
          presupuesto: "",
        };
      }
    },
  },
};
</script>
