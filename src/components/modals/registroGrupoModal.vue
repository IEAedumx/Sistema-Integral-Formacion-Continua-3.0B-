<template>
	<div>
		<b-modal
			@show="onOpenModal()"
			v-model="$parent.modalRegistroGrupo"
			id="modalRegistroGrupo"
			title="Grupo de Formación"
			ok-only
			ok-variant="danger"
			ok-title="Cancelar"
		>
			<div class="col">
				<b-form @submit="submitForm()" onsubmit="return false">
					<strong>Oferta: </strong> {{ nombreOferta }}
					<!---------Campo Grupo------->
					<b-form-group
						label="*Grupo:"
						label-for="grupo"
						description="Establece un identificador de grupo"
					>
						<b-form-input
							placeholder="Escribe un texto"
							required
							id="grupo"
							v-model="grupo.grupo"
							:state="!(grupo.grupo == '')"
						></b-form-input>
					</b-form-group>
					<!--------Campo  cupo------>
					<b-form-group
						label="Cupo:"
						label-for="cupo"
						description="Cantidad de lugares disponibles"
					>
						<b-form-input
							placeholder="Escribe una cantidad entera"
							id="cupo"
							v-model="grupo.cupo"
							type="number"
						></b-form-input>
					</b-form-group>
					<!--------Campo sede------>
					<b-form-group
						label="*Sede:"
						label-for="sede"
						description="Breve descripción de la sede"
					>
						<b-form-input
							id="sede"
							placeholder="Escribe un téxto breve"
							required
							v-model="grupo.sede"
						></b-form-input>
					</b-form-group>
					<!----------------- Campo fecha de inicio -------->
					<div>
						<label for="fecha_ini">Fecha de inicio</label>
						<b-form-datepicker
							id="fecha_ini"
							v-model="grupo.fecha_ini"
							class="mb-2"
						></b-form-datepicker>
					</div>
					<!----------------- Campo fecha de termino -------->
					<div>
						<label for="fecha_fin">Fecha de término</label>
						<b-form-datepicker
							id="fecha_fin"
							v-model="grupo.fecha_fin"
							class="mb-2"
						></b-form-datepicker>
					</div>
					<!--------Campo observacion------>
					<b-form-group
						label="Observación:"
						label-for="observacion"
						description="Observaciones adicionales"
					>
						<b-form-input
							id="observacion"
							placeholder="Escribe un texto"
							v-model="grupo.observacion"
						></b-form-input>
					</b-form-group>
					<!----------------- Campo estatus -------->
					<b-form-group
						label="Estado de la oferta:"
						label-for="estatus"
						description="Estado de la oferta"
					>
						<b-form-select
							id="estatus"
							v-model="grupo.estatus"
							:options="opsEstatus"
						></b-form-select>
					</b-form-group>
					<!---------Campo periodo------->
					<b-form-group
						label="*Periodo:"
						label-for="periodo"
						description="Peridio de capacitación"
					>
						<b-form-input
							placeholder="Escribe un texto"
							required
							id="periodo"
							v-model="grupo.periodoFC"
							:state="!(grupo.periodoFC == '')"
						></b-form-input>
					</b-form-group>
					<!---------Campo linea formacion------->
					<b-form-group
						label="*Linea Formacion:"
						label-for="linea_formacion"
						description="Línea de formación"
					>
						<b-form-input
							placeholder="Escribe un texto"
							required
							id="linea_formacion"
							v-model="grupo.linea_formacion"
							:state="!(grupo.linea_formacion == '')"
						></b-form-input>
					</b-form-group>
					<b-button type="submit">Registrar</b-button>
				</b-form>
			</div>
		</b-modal>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'RegistroGrupoModal',
	data() {
		return {
			idOferta: '',
			nombreOferta: '',
			axiosProp: {
				headers: {
					Authorization: 'bearer ' + sessionStorage.getItem('token'),
				},
			},
			niveles: [],
			presupuestos: [],
			selectedFile: null,
			opsEstatus: [
				{ value: 'INSCRIPCION ABIERTA', text: 'Inscripción Abierta' },
				{ value: 'EN CURSO', text: 'En curso' },
				{ value: 'CANCELADO', text: 'Cancelado' },
				{ value: 'CERRADO', text: 'Cerrado' },
				{ value: 'ACTIVO', text: 'Activo' },
				{ value: 'INACTIVO', text: 'Inactivo' },
				{ value: 'SUSPENDIDO', text: 'Suspendido' },
				{ value: 'SIN CUPO', text: 'Sin Cupo' },
				{ value: 'DISPONIBLE', text: 'Disponible' },
			],
			grupo: {
				grupo: '',
				sede: '',
				cupo: 0,
				fecha_fin: '',
				fecha_ini: '',
				observacion: '',
				estatus: '',
				periodoFC: '',
				linea_formacion: '',
			},
		};
	},
	mounted() {
		this.getNiveles();
	},
	methods: {
		submitForm() {
			if (this.$parent.grupoSelected) {
				axios
					.put(
						process.env.VUE_APP_URL +
							`/ofertasFormacion/${this.idOferta}/grupo/` +
							this.grupo._id,
						this.grupo,
						this.axiosProp
					)
					.then((res) => {
						console.log(res);
						this.$bvModal.msgBoxOk('Se guardaro el registro con éxito');
					})
					.catch((err) => {
						this.$bvModal.msgBoxOk(err);
					});
			} else {
				axios
					.post(
						process.env.VUE_APP_URL +
							`/ofertasFormacion/${this.idOferta}/grupo`,
						this.grupo,
						this.axiosProp
					)
					.then((res) => {
						console.log(res);
						this.$bvModal.msgBoxOk('Se guardaro el registro con éxito');
					})
					.catch((err) => {
						this.$bvModal.msgBoxOk(err);
					});
			}
			this.$parent.modalRegistroGrupo = false;
			this.$router.go(0)
		},
		getNiveles() {
			axios
				.get(process.env.VUE_APP_URL + '/nivelesEducativos', this.axiosProp)
				.then((res) => {
					this.niveles = res.data.nivelesEducativos;
					console.log(this.niveles);
				});
		},
		onOpenModal() {
			this.idOferta = this.$parent.idOferta;
			this.nombreOferta = this.$parent.nombreOferta;
			if (this.$parent.grupoSelected) {
				this.grupo = this.$parent.grupoSelected;
			} else {
				this.grupo = {
					grupo: '',
					sede: '',
					cupo: 0,
					fecha_fin: '',
					fecha_ini: '',
					observacion: '',
					estatus: '',
					periodoFC: '',
					linea_formacion: '',
				};
			}
		},
	},
};
</script>
