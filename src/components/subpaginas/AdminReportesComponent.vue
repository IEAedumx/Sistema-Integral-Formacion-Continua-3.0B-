<template>
  <div>
    <h3>Reportes</h3>
    <hr />
    <strong>Eficiencia terminal:</strong>
    <div class="row">
      <div class="col-4">
        <b-select
          :options="['todo', 'usuario', 'grupo', 'oferta_formacion']"
          v-model="criterio"
        ></b-select>
      </div>
      <div class="col-md-8">
        <b-input-group>
          <b-form-input
            v-model="dato"
            type="search"
            id="filtro"
            placeholder="Escribe un ID"
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="consultaEficiencia" :disabled="buscando"
              >Buscar</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </div>
    </div>
    <pie-chart-component
      v-if="cursosTotal"
      :chartData="chartdata"
      :options="options"
    />
  </div>
</template>

<script>
import axios from "axios";
import PieChartComponent from "../graficas/PieChartComponent.vue";

export default {
  name: "AdminReportesComponent",
  components: { PieChartComponent },
  data() {
    return {
      eficiencia: {
        concluido: 0,
        noConcluido: 0,
        pendiente: 0,
      },
      buscando: false,
      criterio: "todo",
      dato: "Todos los registros",
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
  mounted() {
    this.consultaEficiencia();
  },
  methods: {
    consultaEficiencia() {
      this.buscando = true;
      axios
        .get(
          process.env.VUE_APP_URL +
            `/registros/eficiencia/${this.criterio}/${this.dato}`,
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
                  this.chartdata.datasets[0].data[0] = el.cuenta;
                  this.chartdata.labels[0] = `Concluidos: ${el.cuenta}`;
                  break;
                case "NO CONCLUIDO":
                  this.eficiencia.noConcluido = el.cuenta;
                  this.chartdata.datasets[0].data[1] = el.cuenta;
                  this.chartdata.labels[1] = `No Concluidos: ${el.cuenta}`;
                  break;
                case "PENDIENTE":
                  this.eficiencia.pendiente = el.cuenta;
                  this.chartdata.datasets[0].data[2] = el.cuenta;
                  this.chartdata.labels[2] = `Pendientes: ${el.cuenta}`;
                  break;
              }
              this.cursosTotal += el.cuenta;
            });
            console.log(this.eficiencia);
          }
          this.buscando = false;
        });
    },
  },
};
</script>