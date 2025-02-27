<template>
  <div class="p-3">
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="2">
          <b-avatar class="m-4" size="5em">{{
            $parent.usuarioActivo.nombre
          }}</b-avatar>
        </b-col>
        <b-col md="10">
          <b-card-body>
            <b-card-title
              ><b-icon-person-lines-fill></b-icon-person-lines-fill> Datos de la
              cuenta</b-card-title
            >
            <b-card-text>
              <div class="row">
                <div class="col-md-6">
                  <p>
                    <b>Nombre: </b
                    >{{
                      $parent.usuarioActivo.nombre +
                      " " +
                      $parent.usuarioActivo.primer_apell +
                      " " +
                      $parent.usuarioActivo.segundo_apell
                    }}
                  </p>
                  <p>
                    <b>Usuario/CURP: </b>{{ $parent.usuarioActivo.usuario }}
                  </p>
                  <p>
                    <b>Nivel Académico: </b
                    >{{ $parent.usuarioActivo.preparacion }}
                  </p>
                  <p>
                    <b>Teléfono Móvil: </b
                    >{{ $parent.usuarioActivo.telefono_movil }}
                  </p>
                  <p>
                    <b>Correo electrónico: </b>{{ $parent.usuarioActivo.email }}
                  </p>
                  <p v-if="$parent.usuarioActivo.perfil">
                    <b>Perfil: </b
                    >{{ $parent.usuarioActivo.perfil.descripcion }}
                  </p>
                </div>
                <div class="col-md-6">
                  <strong v-if="cursosTotal">Eficiencia terminal:</strong>
                  <pie-chart-component
                    v-if="cursosTotal"
                    :chartData="chartdata"
                    :options="options"
                  />
                </div>
              </div>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import PieChartComponent from "../graficas/PieChartComponent.vue";

export default {
  components: { PieChartComponent },
  name: "PerfilComponent",
  data() {
    return {
      eficiencia: {
        concluido: 0,
        noConcluido: 0,
        pendiente: 0,
      },
      cursosTotal: 0,
      usuario: {},
      chartdata: {
        labels: ["Concluidos: 0", "No Concluidos: 0", "Pendientes: 0"],
        datasets: [
          {
            backgroundColor: ["#ADD698", "#D65D5D", "#f2cb52"],
            data: [0, 0, 0],
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    };
  },
  beforeMount() {
    this.usuario = this.$parent.usuarioActivo;
    axios
      .get(
        process.env.VUE_APP_URL +
          "/registros/eficiencia/usuario/" +
          sessionStorage.getItem("id"),
        {
          headers: {
            Authorization: "bearer " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.length) {
          res.data.forEach((el) => {
            switch (el._id) {
              case "CONCLUIDO":
                this.eficiencia.concluido = el.cuenta;
                this.chartdata.datasets[0].data[0] = el.cuenta
                this.chartdata.labels[0] = `Concluidos: ${el.cuenta}`
                break;
              case "NO CONCLUIDO":
                this.eficiencia.noConcluido = el.cuenta;
                this.chartdata.datasets[0].data[1] = el.cuenta;
                this.chartdata.labels[1] = `No Concluidos: ${el.cuenta}`
                break;
              case "PENDIENTE":
                this.eficiencia.pendiente = el.cuenta;
                this.chartdata.datasets[0].data[2] = el.cuenta;
                this.chartdata.labels[2] = `Pendientes: ${el.cuenta}`
                break;
            }
            this.cursosTotal += el.cuenta;
          });
          console.log(this.eficiencia);
        }
      });
  },
};
</script>
