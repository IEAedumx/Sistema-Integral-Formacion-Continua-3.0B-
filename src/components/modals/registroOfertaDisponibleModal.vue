<template>
	<div>
		<b-modal
			@show="getGrupos()"
			@hide="resetModal()"
			v-model="$parent.modalRegistroOfertaDisponible"
			id="modalRegistroOfertaDisponible"
			:title="'Registro a ' + ofertaSelected.nombre_curso"
			ok-only
			ok-variant="danger"
			ok-title="Cancelar"
			><div class="col">
				<div v-if="ofertaSelected.grupos.length > 0">
					<b-form-group label="Elige un grupo:">
						<b-form-radio
							v-for="grupo in grupos"
							:key="grupo.key"
							v-model="grupoSelected"
							name="grupos"
							:value="grupo._id"
							>{{ grupo.grupo + ' - ' + grupo.observacion }}</b-form-radio
						>
					</b-form-group>
				</div>
				<div v-else>
					<strong>Lo sentimos, ya no hay grupos disponibles</strong>
				</div>
				<div>
					<b-button
						v-if="grupoSelected != ''"
						variant="success"
						@click="registroOferta()"
						>Registrarme</b-button
					>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'RegistroOfertaDisponibleModal',
	props: {
		ofertaSelected: Object,
	},
	data() {
		return {
			grupos: [],
			estatus: '',
			grupoSelected: '',
			registro: {
				oferta_formacion: '',
				usuario: '',
				grupo: '',
			},
		};
	},
	mounted() {},
	methods: {
		getGrupos() {
			this.grupos = [];
			for (var i in this.ofertaSelected.grupos) {
				if (this.ofertaSelected.grupos[i].estatus == 'INSCRIPCION ABIERTA') {
					this.grupos.push(this.ofertaSelected.grupos[i]);
				}
			}
		},
		registroOferta() {
			console.log('Inicia registro');
			this.registro.oferta_formacion = this.ofertaSelected._id;
			this.registro.usuario = sessionStorage.getItem('id');
			this.registro.curp = sessionStorage.getItem('usuario');
			this.registro.grupo = this.grupoSelected;
			console.log(this.registro);
			axios
				.post(process.env.VUE_APP_URL + '/registros', this.registro, {
					headers: {
						Authorization: 'bearer ' + sessionStorage.getItem('token'),
					},
				})
				.then((res) => {
					console.log(res.data);
					this.$bvModal.msgBoxOk(res.data);
					this.$parent.modalRegistroOfertaDisponible = false;
				});
		},
		resetModal() {
			this.grupos = [];
			this.grupoSelected = '';
		},
	},
};
</script>
