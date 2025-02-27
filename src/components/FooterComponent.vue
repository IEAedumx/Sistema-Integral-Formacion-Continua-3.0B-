<template>
	<footer class="page-footer font-small text-white pt-4 footer-bg d-md-block">
		<!-- Footer Links -->
		<div class="container-fluid text-center text-md-left">
			<!-- Grid row -->
			<div class="row">
				<!-- Grid column -->
				<div class="col-md-6 mt-md-0 mt-3">
					<!-- Content -->
					<h5 class="text-uppercase">Dirección de Carrera del Magisterio</h5>
					<h6>
						Subdirección de Mejora del Magisterio.
					</h6>
					<h6>
						Departamento de Desarrollo Profesional del Magisterio.
					</h6>
				</div>
				<!-- Grid column -->

				<hr class="clearfix w-100 d-md-none pb-3" />

				<!-- Grid column -->
				<div class="col-md-3 mb-md-0 mb-3">
					<!-- Links -->
					<h5 class="text-uppercase">Ligas de interés</h5>

					<ul class="list-unstyled">
						<li>
							<a href="http://www.iea.gob.mx"
								>Instituto de Educación de Aguascalientes</a
							>
						</li>
						<li>
							<a href="http://aguascalientes.gob.mx">Gobierno del Estado</a>
						</li>
					</ul>
				</div>
				<!-- Grid column -->

				<!-- Grid column -->
				<div class="col-md-3 mb-md-0 mb-3">
					<!-- Links -->
					<h5 class="text-uppercase">Páginas relacionadas</h5>

					<ul class="list-unstyled">
						<li>
							<a href="http://dgfc.basica.sep.gob.mx/"
								>Dir. Gral. de Formación Continua - SEP</a
							>
						</li>
						<li>
							<a href="https://nuevaescuelamexicana.sep.gob.mx/"
								>Nueva Escuela Mexicana</a
							>
						</li>
					</ul>
				</div>
				<!-- Grid column -->
			</div>
			<!-- Grid row -->
		</div>
		<!-- Footer Links -->
		<!-- Copyright -->
		<div class="footer-copyright text-center py-3">
			IEA DCM - 2025
		</div>
		<!-- Copyright -->
	</footer>
	<!-- Footer -->
</template>

<script>
export default {
	name: 'FooterComponent',
};
</script>

<style scoped>
.footer-bg {
	background-color: rgb(77, 45, 120);
}
.footer-copyright {
	font-size: 12pt;
	background-color: rgb(218, 0, 125);
}
footer,
a {
	color: white;
	font-size: 8pt;
}

html,
body {
 height: 200%;
 position: relative;
}
footer {
 position: relative;
 bottom: 0;
 width: 100%;
}

</style>
