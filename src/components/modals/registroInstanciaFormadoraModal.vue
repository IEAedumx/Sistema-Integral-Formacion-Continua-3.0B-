<template>
  <div>
    <b-modal
      @show="onOpenModal"
      v-model="$parent.modalRegistroInstanciaFormadora"
      id="modalRegistroInstanciaFormadora"
      title="Instancia Formadora"
      ok-only
      ok-variant="danger"
      ok-title="Cancelar"
    >
      <div class="col">
        <b-form @submit="submitForm()" onsubmit="return false">
          <!---------Campo Nombre------->
          <b-form-group
            label="*Nombre:"
            label-for="nombre"
            description="Verifica que el nombre este escrito correctamente"
          >
            <b-form-input
              placeholder="Nombre de Instancia"
              required
              id="nombre"
              v-model="instancia.nombre"
              :state="!(instancia.nombre == '')"
            ></b-form-input>
          </b-form-group>
          <!---------Campo Firmante------->
          <b-form-group
            label="Firmante:"
            label-for="firmante"
            description="Verifica que el nombre este escrito correctamente"
          >
            <b-form-input
              placeholder="Nombre completo firmante"
              required
              id="firmante"
              v-model="instancia.firmante"
            ></b-form-input>
          </b-form-group>
          <!---------Campo cargo firmante------->
          <b-form-group
            label="Cargo Firmante:"
            label-for="cargo_firmante"
            description="Cargo de quien firmará las constancias"
          >
            <b-form-input
              placeholder="Cargo del firmante"
              id="cargo_firmante"
              v-model="instancia.cargo_firmante"
            ></b-form-input>
          </b-form-group>
          <!--------Campo RFC ------>
          <b-form-group
            label="RFC:"
            label-for="rfc"
            description="Escribe el RFC (opcional)"
          >
            <b-form-input
              placeholder="RFC"
              id="rfc"
              v-model="instancia.rfc"
            ></b-form-input>
          </b-form-group>
          <!--------Campo  CCT------>
          <b-form-group
            label="CCT:"
            label-for="cct"
            description="Escribe la clave de centro de trabajo"
          >
            <b-form-input
              placeholder="CCT"
              id="cct"
              v-model="instancia.cct"
            ></b-form-input>
          </b-form-group>
          <!--------Campo teléfono 1------>
          <b-form-group
            label="*Teléfono de contacto principal:"
            label-for="telefono1"
            description="Escribe sólo el número a 10 dígitos"
          >
            <b-form-input
              id="telefono1"
              placeholder="Escriba el teléfono de contacto"
              required
              pattern="^[0-9]{10}$"
              v-model="instancia.telefono1"
              :state="/^[0-9]{10}$/.test(instancia.telefono1)"
            ></b-form-input>
          </b-form-group>
          <!--------Campo teléfono 2------>
          <b-form-group
            label="Teléfono de contacto alternativo (opcional):"
            label-for="telefono2"
            description="Escribe sólo el número a 10 dígitos"
          >
            <b-form-input
              id="telefono2"
              placeholder="Escriba el teléfono alternativo"
              pattern="^[0-9]{10}$"
              v-model="instancia.telefono2"
              :state="/^[0-9]{10}$|^$/.test(instancia.telefono2) ? null : false"
            ></b-form-input>
          </b-form-group>
          <!----------------- Campo estatus -------->
          <b-form-group
            label="Estatus:"
            label-for="estatus"
            description="Estado de la instancia"
          >
            <b-form-select
              id="estatus"
              v-model="instancia.activo"
              :options="opsSelect"
            ></b-form-select>
          </b-form-group>
          <!----------------- Campo estatus -------->
          <b-form-group
            label="Tipo de sostenimiento:"
            label-for="tipo"
            description="Tipo de sostenimiento"
          >
            <b-form-select
              id="tipo"
              v-model="instancia.tipo"
              :options="opsTipo"
            ></b-form-select>
          </b-form-group>
          <!----------- Campo archivo -------------->
          <b-form-group
            label="Logotipo:"
            label-for="logo"
            description="Estado de la instancia"
          >
            <b-form-file
              id="logo"
              @change="cambiaArchivo"
              name="logo"
              v-model="logo"
              browse-text="Examinar"
              :state="Boolean(logo)"
              placeholder="Elije un archivo de imagen o arrastralo aquí..."
              drop-placeholder="Arrastra el archivo aquí..."
            ></b-form-file>
          </b-form-group>
          <b-button v-if="!registrando" type="submit">Guardar</b-button>
          <div v-if="registrando">
            <strong>Cargando: </strong>{{ uploadPercentage }}
          </div>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistroInstanciaFormadoraModal",
  data() {
    return {
      uploadPercentage: 0,
      registrando: false,
      logo: null,
      form: null,
      update: false,
      selectedFile: null,
      opsSelect: [
        { value: true, text: "Activo" },
        { value: false, text: "Inactivo" },
      ],
      opsTipo: [
        { value: "", text: "Selecciona un tipo" },
        { value: "PÚBLICA", text: "Pública" },
        { value: "PRIVADA", text: "Privada" },
      ],
      instancia: {
        nombre: "",
        firmante: "",
        cargo_firmante: "",
        rfc: "",
        cct: "",
        telefono1: "",
        telefono2: "",
        activo: true,
        domicilio: "",
        tipo: "",
        email: "",
        img: "",
      },
    };
  },
  methods: {
    cambiaArchivo(e) {
      this.selectedFile = e.target.files[0];
    },
    submitForm() {
      this.registrando = true;
      if (("Actualizar Instancia", this.update)) {
        console.log(this.instancia);
        const formdata = new FormData();
        formdata.append("logo", this.selectedFile);
        formdata.append("instancia", JSON.stringify(this.instancia));
        axios
          .put(
            process.env.VUE_APP_URL +
              "/institucionesFormadoras/" +
              this.instancia._id,
            formdata,
            {
              headers: {
                Authorization: "bearer " + sessionStorage.getItem("token"),
              },
              onUploadProgress: function (evt) {
                this.uploadPercentage = parseInt(
                  Math.round((evt.loaded / evt.total) * 100)
                );
              }.bind(this),
            }
          )
          .then((res) => {
            console.log(res);
            this.$bvModal.msgBoxOk("Instancia registrada con éxito");
            this.$parent.modalRegistroInstanciaFormadora = false;
            this.registrando = false;
            this.$parent.getInstancias();
          })
          .catch((err) => {
            console.log(err);
            this.$bvModal.msgBoxOk("Ocurrio un error al registrar");
            this.registrando = false;
          });
      } else {
        console.log(this.instancia);
        const formdata = new FormData();
        formdata.append("logo", this.selectedFile);
        formdata.append("instancia", JSON.stringify(this.instancia));
        axios
          .post(
            process.env.VUE_APP_URL + "/institucionesFormadoras/",
            formdata,
            {
              headers: {
                Authorization: "bearer " + sessionStorage.getItem("token"),
              },
              onUploadProgress: function (evt) {
                this.uploadPercentage = parseInt(
                  Math.round((evt.loaded / evt.total) * 100)
                );
              }.bind(this),
            }
          )
          .then(
            (res) => {
              console.log(res);
              this.$bvModal.msgBoxOk("Instancia registrada con éxito");
              this.$parent.modalRegistroInstanciaFormadora = false;
              this.registrando = false;
              this.$parent.getInstancias();
            },
            (err) => {
              console.log(err);
              this.$bvModal.msgBoxOk("Ocurrio un error al registrar");
              this.registrando = false;
            }
          );
      }
    },
    onOpenModal() {
      if (this.$parent.instanciaSelected) {
        this.update = true;
        this.instancia = this.$parent.instanciaSelected;
      } else {
        this.update = false;
        this.instancia = {
          nombre: "",
          rfc: "",
          cct: "",
          telefono1: "",
          telefono2: "",
          activo: true,
          domicilio: "",
          tipo: "",
          email: "",
          img: "",
        };
      }
    },
  },
};
</script>
