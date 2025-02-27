<template>
  <div>
    <h3>Consulta y Administración de Usuarios</h3>
    <b-form-group label="Escribe un dato a Buscar:" label-for="filtro">
      <b-input-group>
        <b-form-input
          v-model="filtro"
          type="search"
          id="filtro"
          placeholder="Escribe un dato a Buscar"
        ></b-form-input>
        <b-input-group-append>
          <b-button @click="getUsuarios">Buscar</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <div>
      <b-table striped hover :items="usuarios" :fields="fields">
        <template #cell(movs)="row">
          <b-button @click="editar(row.item)"
            ><b-icon icon="pencil" v-b-tooltip.hover title="Editar"></b-icon></b-button
          >
        </template>
      </b-table>
    </div>
    <RegistroUsuarioModal></RegistroUsuarioModal>
  </div>
</template>

<script>
import axios from "axios";
import RegistroUsuarioModal from "../modals/registroUsuarioModal";

export default {
  name: "AdminUsuariosComponent",
  components: {RegistroUsuarioModal},
  data: function () {
    return {
      filtro: "",
      usuarios: [],
      usuarioSelected: {},
      modalRegistroUsuario: false,
      fields: [
        "movs",
        {key:"usuario", sortable: true},
        {key:"nombre", sortable: true},
        {key:"primer_apell", sortable: true},
        {key:"segundo_apell", sortable: true},
        "email",
        "telefono_movil",
        "telefono_fijo",
      ],
    };
  },
  methods: {
    editar(registro) {
        console.log('Registro', registro);
        this.usuarioSelected = registro;
        this.modalRegistroUsuario = true;
    },
    getUsuarios() {
      axios
        .get(process.env.VUE_APP_URL + "/usuarios/filtro/" + this.filtro, {
          headers: {
            Authorization: "bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.usuarios = res.data;
        });
    },
  },
};
</script>