<template>
	<div>
		<h3>Instancias Formadoras</h3>
		<h4>Catálogo de instancias formadoras</h4>
		<hr />
		<b-form-group label="Filtro:" label-for="filterInput">
			<b-input-group>
				<b-form-input
					v-model="filter"
					type="search"
					id="filterInput"
					placeholder="Escribe un dato a filtrar"
				></b-form-input>
				<b-input-group-append>
					<b-button :disabled="!filter" @click="filter = ''">Limpiar</b-button>
				</b-input-group-append>
			</b-input-group>
		</b-form-group>
		<b-button variant="success" @click="openModalInstancia()"
			>Nueva instancia</b-button
		>
		<div>
			<b-table
				striped
				hover
				:items="instancias"
				:busy="cargando"
				:fields="fields"
				:filter="filter"
			>
				<template v-slot:table-busy>
					<div class="text-center text-danger my-2">
						<b-spinner class="align-middle"></b-spinner>
						<strong>Cargando...</strong>
					</div>
				</template>
				<template v-slot:cell(img)="data">
					<img
						height="auto"
						width="100px"
						:src="env_url + '/backassets/logos/' + data.item.img"
					/>
				</template>
				<template #cell(show_details)="row">
					<b-button size="sm" class="mr-2" @click="row.toggleDetails">
						{{ row.detailsShowing ? 'Ocultar' : 'Mostrar' }} Detalles
					</b-button>
				</template>
				<template #row-details="row">
					<b-card>
						<b-row class="mb-2">
							<b-col sm="3" class="text-sm-right"><b>Id:</b></b-col>
							<b-col>{{ row.item.id }}</b-col>
						</b-row>

						<b-row class="mb-2">
							<b-col sm="3" class="text-sm-right"><b>Activa:</b></b-col>
							<b-col>{{ row.item.activo }}</b-col>
						</b-row>

						<b-button class="m-3" size="sm" @click="row.toggleDetails"
							>Ocultar Detalles</b-button
						>
						<b-button size="sm" @click="openModalInstancia(row.item)"
							>Editar</b-button
						>
					</b-card>
				</template>
			</b-table>
		</div>
		<registroInstanciaFormadoraModal></registroInstanciaFormadoraModal>
	</div>
</template>

<script>
import axios from 'axios';
import RegistroInstanciaFormadoraModal from '../modals/registroInstanciaFormadoraModal';

export default {
	name: 'InstanciasComponent',
	components: { RegistroInstanciaFormadoraModal },
	data() {
		return {
			modalRegistroInstanciaFormadora: false,
			env_url: process.env.VUE_APP_URL,
			filter: null,
			instancias: [],
			instanciaSelected: false,
			cargando: false,
			fields: [
				{
					key: 'img',
				},
				{
					key: 'nombre',
					sortable: true,
				},
				{
					key: 'show_details',
					sortable: true,
				},
			],
		};
	},
	mounted() {
		this.getInstancias();
	},
	methods: {
		getInstancias() {
			this.cargando = true;
			axios
				.get(process.env.VUE_APP_URL + '/institucionesFormadoras', {
					headers: {
						Authorization: 'bearer ' + sessionStorage.getItem('token'),
					},
				})
				.then((res) => {
					console.log(res.data);
					this.instancias = res.data;
					this.cargando = false;
				});
		},
		openModalInstancia(instancia = false) {
			if (instancia) {
				this.instanciaSelected = instancia;
			} else {
				this.instanciaSelected = false;
			}
			this.modalRegistroInstanciaFormadora = true;
		},
	},
};
</script>
