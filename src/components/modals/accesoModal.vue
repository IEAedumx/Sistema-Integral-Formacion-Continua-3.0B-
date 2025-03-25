<template>
	<div>
		<b-modal
			v-model="$parent.modalSelectAcceso"
			id="selectAccesModal"
			title="Acceso a SIFC"
			ok-only
			ok-title="Cerrar"
		>
			<div class="row">
				<div class="col-6">
					
					<b-jumbotron
						class="h-100 animcolorAzul"
						text-variant="white"
						@click="$parent.loginGoogle()"
					>
						Acceso sólo Educación Básica pública y PAAE con cuenta institucional
						@iea.edu.mx
					</b-jumbotron>
					
				</div>
				
				<div class="col-6">
					<b-jumbotron class="h-100 animcolorGris" text-variant="white">
						Acceso a otros niveles e instituciones Educativas (Próximamente)
					</b-jumbotron>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
export default {
	name: 'AccesoModal',
};
</script>
