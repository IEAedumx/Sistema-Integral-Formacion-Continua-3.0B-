<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="primary">
			<b-navbar-brand href="#">{{ titulo }}</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav> </b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-item to="/">Inicio</b-nav-item>
					<!--<b-nav-item to="/contacto">Acerca de</b-nav-item>
					<b-nav-item to="/dashboard">Tablero</b-nav-item>
					<b-nav-item-dropdown right>
						<template v-slot:button-content>
							<em>Sesión</em>
						</template>
						<b-dropdown-item href="#">Perfil</b-dropdown-item>
						<b-dropdown-item href="#">Cerrar Sesión</b-dropdown-item>
					</b-nav-item-dropdown>-->
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
export default {
	name: 'Navbar',
	props: {
		titulo: String,
	},
};
</script>
