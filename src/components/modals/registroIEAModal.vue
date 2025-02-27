<template>
  <div>
    <b-modal
      v-model="$parent.modalRegistroIEA"
      id="modalRegistroIEA"
      title="Registro institucional"
      ok-only
      ok-variant="danger"
      ok-title="Cancelar"
    >
      <div class="col">
        <div>
          <p>
            Cuenta: <b>{{ this.email }}</b>
          </p>
          <p></p>
        </div>

        <b-form @submit="onSubmitIEA()">
          <!---------Campo CURP------->
          <b-form-group
            id="input-group-1"
            label="CURP:"
            label-for="curp"
            description="Verifica que la CURP sea correcta"
          >
            <b-form-input
              placeholder="CURP"
              required
              id="curp"
              v-model="usuario.usuario"
              pattern="^[A-Z]{1}[AEIOUX]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$"
              :state="
                /^[A-Z]{1}[AEIOUX]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/.test(
                  usuario.usuario
                )
              "
            ></b-form-input>
          </b-form-group>
          <!--------Campo nombre ------>
          <b-form-group
            id="input-group-1"
            label="Nombre:"
            label-for="nombre"
            description="Nombre(s), sólo mayúsculas, sin puntos ni acentos"
          >
            <b-form-input
              placeholder="Nombre(s)"
              required
              id="nombre"
              v-model="usuario.nombre"
              :state="/^[A-ZÑ ]{1,}$/.test(usuario.nombre)"
            ></b-form-input>
          </b-form-group>
          <!--------Campo primer apellido ------>
          <b-form-group
            id="input-group-1"
            label="Primer apellido:"
            label-for="prim_apell"
            description="Primer apellido, sólo mayúsculas, sin puntos ni acentos"
          >
            <b-form-input
              placeholder="Primer Apellido"
              required
              id="prim_apell"
              v-model="usuario.primer_apell"
              :state="/^[A-ZÑ ]{1,}$/.test(usuario.primer_apell)"
            ></b-form-input>
          </b-form-group>
          <!--------Campo segundo apellido ------>
          <b-form-group
            id="input-group-1"
            label="Segundo Apellido:"
            label-for="seg_apell"
            description="Segundo Apellido, sólo mayúsculas, sin puntos ni acentos"
          >
            <b-form-input
              placeholder="Segundo Apellido:"
              required
              id="seg_apell"
              v-model="usuario.segundo_apell"
              :state="/^[A-ZÑ ]{1,}$/.test(usuario.segundo_apell)"
            ></b-form-input>
          </b-form-group>
          <!--------Campo teléfono fijo------>
          <b-form-group
            id="input-group-1"
            label="Teléfono (10 dígitos):"
            label-for="telefono_fijo"
            description="Escribe sólo el número a 10 dígitos"
          >
            <b-form-input
              id="telefono_fijo"
              placeholder="Teléfono fijo"
              required
              pattern="^[0-9]{10}$"
              v-model="usuario.telefono_fijo"
              :state="/^[0-9]{10}$/.test(usuario.telefono_fijo)"
            ></b-form-input>
          </b-form-group>
          <!--------Campo teléfono móvil------>
          <b-form-group
            id="input-group-2"
            label="Teléfono (10 dígitos):"
            label-for="telefono"
            description="Escribe sólo el número a 10 dígitos"
          >
            <b-form-input
              id="telefono"
              placeholder="Teléfono celular"
              required
              pattern="^[0-9]{10}$"
              v-model="usuario.telefono_movil"
              :state="/^[0-9]{10}$/.test(usuario.telefono_movil)"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Grado Académico:"
            label-for="grado"
            description="El último grado de estudios, especifíca el nombre completo"
          >
            <b-form-input
              placeholder="Último grado académico"
              id="grado"
              v-model="usuario.preparacion"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit">Registrar</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistroIEAModal",
  props: {
    email: String,
    accion: String,
  },
  data() {
    return {
      envURL: process.env.VUE_APP_URL,
      usuario: {
        telefono_movil: "",
        telefono_fijo: "",
        usuario: "",
        preparacion: "",
        nombre: "",
        primer_apell: "",
        segundo_apell: "",
        email: "",
        hash: "A123456",
        perfil: "",
      },
    };
  },
  methods: {
    onSubmitIEA() {
      this.usuario.email = this.email;
      this.usuario.perfil = "5f885b414a0d544578250d40";
      axios
        .post(process.env.VUE_APP_URL + "/usuarios/registro", this.usuario)
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>
