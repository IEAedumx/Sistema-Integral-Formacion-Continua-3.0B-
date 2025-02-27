<template>
  <div class="container">
    <h3>Oferta de Formación</h3>
    <h4>Inscripción a ofertas disponibles</h4>
    <b-alert v-if="ofertas.length <= 0" variant="warning" dismissible show>
      Por el momento no se han publicado ofertas, este atento(a) en este apartado.
    </b-alert>
    <div>
      <b-card-group columns>
        <b-card
          v-for="oferta in ofertas"
          :key="oferta.idx"
          :title="oferta.nombre_curso[0]"
          :img-src="
            url + '/backassets/logos/' + oferta.institucion_formadora.img
          "
          :sub-title="oferta.institucion_formadora.nombre"
          img-alt="Image"
          img-top
          img-height="auto"
          img-width="auto"
          tag="article"
          class="mb-2"
        >
          <b-card-text>
            {{ oferta.descripcion }}
          </b-card-text>

          <b-button href="#" variant="success" @click="registroOferta(oferta)"
            >Registrarme</b-button
          >
        </b-card>
      </b-card-group>
    </div>
    <RegistroOfertaDisponibleModal
      :ofertaSelected="ofertaSelected"
    ></RegistroOfertaDisponibleModal>
    <MensajeRegistroModal></MensajeRegistroModal>
  </div>
</template>

<script>
import axios from "axios";
import RegistroOfertaDisponibleModal from "../modals/registroOfertaDisponibleModal";
import MensajeRegistroModal from "../modals/mensajeRegistroModal";

export default {
  name: "OfertaDispComponent",
  components: {
    RegistroOfertaDisponibleModal,
    MensajeRegistroModal
  },
  data() {
    return {
      ofertas: [],
      ofertaSelected: { nombre_curso: "No seleccionado", grupos: [] },
      modalRegistroOfertaDisponible: false,
      modalMensajeRegistroUsuario: false,
      url: process.env.VUE_APP_URL,
    };
  },
  created() {
    this.getOfertas();
    //this.modalMensajeRegistroUsuario = true;
  },
  methods: {
    getOfertas() {
      axios
        .get(this.url + "/ofertasFormacionDisponible", {
          headers: {
            Authorization: "bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.ofertas = res.data.ofertasFormacion;
        });
    },
    registroOferta(ofertaSelected) {
      this.ofertaSelected = ofertaSelected;
      this.modalRegistroOfertaDisponible = true;
    },
  },
};
</script>
