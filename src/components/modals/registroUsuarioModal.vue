<template>
  <div>
    <b-modal
      @show="onOpenModal()"
      v-model="$parent.modalRegistroUsuario"
      id="modalRegistroGrupo"
      title="Administración de Usuario"
      ok-only
      ok-variant="danger"
      ok-title="Cancelar"
    >
      <div class="col">
        <strong>{{ labelID }}</strong>
        <b-form @submit="submitForm()" onsubmit="return false">
          <!---------Campo curp/usuario------->
          <b-form-group label="*CURP:" label-for="curp" description="CURP">
            <b-form-input
              placeholder="CURP"
              required
              id="curp"
              v-model="usuario.usuario"
              :state="!(usuario.usuario == '')"
            ></b-form-input>
          </b-form-group>
          <!--------Campo  nombre------>
          <b-form-group
            label="*Nombre:"
            label-for="nombre"
            description="Nombre(s) del usuario"
          >
            <b-form-input
              placeholder="Escribe el nombre(s)"
              id="nombre"
              required
              v-model="usuario.nombre"
              :state="!(usuario.nombre == '')"
            ></b-form-input>
          </b-form-group>
          <!--------Campo primer apellido------>
          <b-form-group
            label="*Primer Apellido:"
            label-for="primer_apell"
            description="Primer apellido"
          >
            <b-form-input
              id="primer_apell"
              placeholder="Escribe el primer apellido"
              required
              v-model="usuario.primer_apell"
              :state="!(usuario.primer_apell == '')"
            ></b-form-input>
          </b-form-group>
          <!--------Campo segundo apellido------>
          <b-form-group
            label="Segundo apellido:"
            label-for="segundo_apell"
            description="Segundo apellido"
          >
            <b-form-input
              id="segundo_apell"
              placeholder="Escribe el segundo apellido"
              v-model="usuario.segundo_apell"
            ></b-form-input>
          </b-form-group>
          <!--------Campo nivel académico ------>
          <b-form-group
            label="Nivel académico:"
            label-for="preparacion"
            description="preparacion"
          >
            <b-form-input
              id="nivel"
              placeholder="Escribe el nivel académico"
              v-model="usuario.preparacion"
            ></b-form-input>
          </b-form-group>
          <!---------Campo email------->
          <b-form-group
            label="*Email:"
            label-for="email"
            description="Correo electrónico del usuario"
          >
            <b-form-input
              placeholder="Escribe el correo electrónico"
              required
              id="email"
              type="email"
              v-model="usuario.email"
              :state="!(usuario.email == '')"
            ></b-form-input>
          </b-form-group>
          <!---------Campo teléfono fijo------->
          <b-form-group
            label="Teléfono fijo:"
            label-for="telefono_fijo"
            description="Teléfono fijo"
          >
            <b-form-input
              placeholder="Escribe el teléfono a 10 dígitos"
              id="telefono_fijo"
              type="number"
              v-model="usuario.telefono_fijo"
            ></b-form-input>
          </b-form-group>
          <!---------Campo teléfono móvil------->
          <b-form-group
            label="*Teléfono móvil:"
            label-for="telefono_movil"
            description="Teléfono celular del usuario"
          >
            <b-form-input
              placeholder="Escribe el teléfono a 10 dígitos"
              required
              id="telefono_movil"
              type="number"
              v-model="usuario.telefono_movil"
              :state="!(usuario.telefono_movil == '')"
            ></b-form-input>
          </b-form-group>
          <!---------Campo perfil------->
          <b-form-group
            label="*Perfil:"
            label-for="perfil"
            description="Perfil de Usuario"
          >
            <b-form-select
              v-model="usuario.perfil"
              required
              :options="perfiles"
              value-field="_id"
              text-field="perfil"
              id="perfil"
            >
            </b-form-select>
            <!--------- Opción de cambio de contraseña ---------->
            <b-form-checkbox id="cambiaPass" v-model="cambiaPass" value="true">
              Cambiar password
            </b-form-checkbox>
            <!--------Campo hash/password ------>
            <b-form-group
              v-if="cambiaPass"
              label="Password:"
              label-for="hash"
              description="Nueva contraseña"
            >
              <b-form-input
                id="hash"
                placeholder="Escribe una nueva contraseña"
                v-model="usuario.hash"
              ></b-form-input>
            </b-form-group>
          </b-form-group>
          <b-button type="submit">Guardar</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistroUsuarioModal",
  data() {
    return {
      axiosProp: {
        headers: {
          Authorization: "bearer " + sessionStorage.getItem("token"),
        },
      },
      perfiles: [],
      cambiaPass: false,
      labelID: "",
      perfilSelected: "",
      usuario: {
        usuario: "",
        nombre: "",
        primer_apell: "",
        segundo_apell: "",
        email: "",
        telefono_fijo: 0,
        telefono_movil: 0,
        preparacion: "",
        perfil: "",
      },
    };
  },
  mounted() {
    this.getPerfiles();
  },
  methods: {
    submitForm() {
      if (this.$parent.usuarioSelected) {
        axios
          .put(
            process.env.VUE_APP_URL + `/usuarios/edit/` + this.usuario._id,
            this.usuario,
            this.axiosProp
          )
          .then((res) => {
            this.$bvModal.msgBoxOk(res.data);
          })
          .catch((err) => {
            this.$bvModal.msgBoxOk(err);
          });
      } else {
        axios
          .post(
            process.env.VUE_APP_URL +
              `/usuarios/`,
            this.usuario,
            this.axiosProp
          )
          .then((res) => {
            console.log(res);
            this.$bvModal.msgBoxOk(res.data);
            this.$router.go(0);
          })
          .catch((err) => {
            this.$bvModal.msgBoxOk(err);
          });
      }
      this.$parent.modalRegistroUsuario = false;
    },
    getPerfiles() {
      axios
        .get(process.env.VUE_APP_URL + "/perfiles", this.axiosProp)
        .then((res) => {
          this.perfiles = res.data;
          console.log(this.perfiles);
        });
    },
    onOpenModal() {
      this.cambiaPass = false;
      if (this.$parent.usuarioSelected) {
        this.usuario = this.$parent.usuarioSelected;
        this.usuario.hash = "";
        this.labelID = this.usuario._id;
      } else {
        this.labelID = "";
        this.usuario = {
          usuario: "",
          nombre: "",
          primer_apell: "",
          segundo_apell: "",
          email: "",
          telefono_fijo: 0,
          telefono_movil: 0,
          preparacion: "",
          perfil: "",
        };
      }
    },
  },
};
</script>
