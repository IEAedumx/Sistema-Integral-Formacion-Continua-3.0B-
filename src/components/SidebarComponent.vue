<template>
  <div class="container" style="padding-top: 10px">
    <b-list-group>
      <b-list-group-item variant="primary">Menu Usuario</b-list-group-item>
      <b-list-group-item to="/dashboard/perfil" active-class="active"
        >Mi Cuenta</b-list-group-item
      >
      <b-list-group-item to="/dashboard/ofertaDisp" active-class="active"
        >Oferta Disponible</b-list-group-item
      >
      <b-list-group-item to="/dashboard/miFormacion" active-class="active"
        >Mi Formación</b-list-group-item
      >
      <!--<b-list-group-item to="/dashboard/Convocatorias" active-class="active"
        >Convocatorias</b-list-group-item
      >-->
    </b-list-group>
    <b-list-group v-if="perfil == 'ADMIN'">
      <b-list-group-item variant="primary">Administración</b-list-group-item>
      <b-list-group-item to="/dashboard/adminInstancias" active-class="active"
        >Instancias Formadoras</b-list-group-item
      >
      <b-list-group-item to="/dashboard/adminOfertas" active-class="active"
        >Ofertas de Formación</b-list-group-item
      >
      <b-list-group-item to="/dashboard/adminGrupos" active-class="active"
        >Grupos</b-list-group-item
      >
      <b-list-group-item to="/dashboard/adminCargaMasiva" active-class="active"
        >Movimientos Masivos</b-list-group-item
      >
      <b-list-group-item to="/dashboard/adminUsuarios" active-class="active"
        >Usuarios</b-list-group-item
      >
      <b-list-group-item to="/dashboard/adminRegistros" active-class="active"
        >Registros</b-list-group-item
      >
      <b-list-group-item to="/dashboard/adminReportes" active-class="active"
        >Reportes</b-list-group-item
      >

    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      perfil: sessionStorage.getItem("perfil"),
    };
  },
};
</script>
