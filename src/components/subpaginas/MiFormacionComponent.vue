<template>
  <div>
    <h3>Mis Cursos de Formación</h3>
    <h4>Cursos en los que te has registrado en SIFC</h4>
    <b-alert v-if="misCursos.length <= 0" variant="warning" dismissible show>
      Por el momento no te has registrado a ofertas en SIFC, aqui aparecerán las
      ofertas a las que te has registrado.
    </b-alert>
    <div>
      <b-card-group columns>
        <b-card
          v-for="curso in misCursos"
          :key="curso.idx"
          :title="curso.oferta_formacion.nombre_curso[0]"
          :img-src="
            url +
            '/backassets/logos/' +
            curso.oferta_formacion.institucion_formadora.img
          "
          :sub-title="curso.oferta_formacion.institucion_formadora.nombre"
          img-alt="Image"
          img-top
          img-height="auto"
          img-width="auto"
          tag="article"
          class="mb-2"
        >
          <b-card-text>
            {{ curso.oferta_formacion.descripcion }}
            <div><strong>Resultado: </strong>{{ curso.resultado }}</div>
          </b-card-text>

          <!--<b-button href="#" variant="success">Registrarme</b-button>-->
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MiFormacionComponent",
  data() {
    return {
      misCursos: [],
      url: process.env.VUE_APP_URL,
    };
  },
  mounted() {
    this.getMisCursos();
  },
  methods: {
    getMisCursos() {
      axios
        .get(
          process.env.VUE_APP_URL +
            "/registros/usuario/" +
            sessionStorage.getItem("id"),
          {
            headers: {
              authorization: "bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.misCursos = res.data;
        });
    },
  },
};
</script>