<template>
  <div class="row">
    <div class="col-sm-3">
      <SidebarComponent></SidebarComponent>
    </div>
    <div class="col-sm-9">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SidebarComponent from "./SidebarComponent";
import axios from "axios";

export default {
  name: "DashboardComponent",
  components: {
    SidebarComponent,
  },
  data() {
    return {
      usuarioActivo: {},
    };
  },
  mounted() {
    axios
      .get(
        process.env.VUE_APP_URL +
          "/usuarios/_id/" +
          sessionStorage.getItem("id"),
        {
          headers: {
            Authorization: "bearer " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        this.usuarioActivo = res.data[0];
      });
  },
};
</script>
