<template>
	<div>
		<b-modal
			v-model="$parent.modalMensajeRegistroUsuario"
			id="mensajeRegistroModal"
			title="Mensaje Importante"
			ok-only
			ok-title="De acuerdo"
		>
			<div class="row">
				<b-jumbotron>
					IMPORTANTE: Sólo podrás registrarte a un sólo curso de este periodo de oferta, 
					por lo que te recomendamos realizar tu selección con cuidado.
				</b-jumbotron>
			</div>
		</b-modal>
	</div>
</template>

<script>
export default {
	name: 'MensajeRegistroModal',
};
</script>
