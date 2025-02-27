<template>
	<div>
		<div class="row" style="width: 100%">
			<div class="col-md-8 p-4 text-center">
				<CarruselComponent></CarruselComponent>
			</div>
			<div class="col-md-4 text-center p-4">
				<div class="text-center">
					<b-card
						title="Bienvenid@s"
						:img-src="url + '/backassets/logos/IEA-logo-al100.png'"
						img-alt="Image"
						img-top
						tag="article"
						style="width: 100%"
					>
						<b-card-text>
							Sistema Integral de Formación Continua v3.0
						</b-card-text>
						<template #footer>
							<b-button v-b-modal.selectAccesModal>Acceso/Registro</b-button>
						</template>
					</b-card>
				</div>
			</div>
		</div>
		<div class="row" style="height: 100px"></div>
		<FooterComponent></FooterComponent>
		<AccesoModal></AccesoModal>
		<RegistroIEAModal :email="gCuenta" accion="nuevo"></RegistroIEAModal>
	</div>
</template>

<script>
import CarruselComponent from './CarruselComponent';
import axios from 'axios';
import AccesoModal from './modals/accesoModal';
import RegistroIEAModal from './modals/registroIEAModal';
import FooterComponent from './FooterComponent';

export default {
	name: 'PrincipalComponent',
	components: {
		CarruselComponent,
		AccesoModal,
		RegistroIEAModal,
		FooterComponent,
	},
	data() {
		return {
			gCuenta: '',
			modalSelectAcceso: false,
			modalRegistroIEA: false,
			url: process.env.VUE_APP_URL,
		};
	},
	methods: {
		loginGoogle() {
			this.modalSelectAcceso = false;
			this.$gAuth.signIn().then((res) => {
				console.log(res.getBasicProfile().getEmail());
				this.gCuenta = res.getBasicProfile().getEmail();
				this.loginIEA(this.gCuenta);
			});
		},
		msgBox(titulo, mensaje) {
			return this.$bvModal.msgBoxOk(mensaje, {
				title: titulo,
				size: 'md',
				buttonSize: 'sm',
				okVariant: 'success',
				okTitle: 'Aceptar',
				headerClass: 'p-2 border-bottom-0',
				footerClass: 'p-2 border-top-0',
				centered: true,
			});
		},
		loginIEA(gCuenta) {
			console.log(gCuenta);
			if (gCuenta.includes('@iea.edu.mx')) {
				axios
					.post(process.env.VUE_APP_URL + '/usuarios/iealogin', {
						email: gCuenta,
					})
					.then(
						(res) => {
							console.log(res);
							sessionStorage.setItem('token', res.data.token);
							sessionStorage.setItem('perfil', res.data.usuario.perfil.perfil);
							sessionStorage.setItem('usuario', res.data.usuario.usuario);
							sessionStorage.setItem('id', res.data.usuario.id);
							this.$router.push('dashboard/perfil');
						},
						(err) => {
							console.log('Error de consulta', err);
							this.msgBox(
								'Cuenta no registrada',
								'La cuenta no ha sido registrada, de clic en aceptar para realizar un registro con esta cuenta'
							).then((res) => {
								if (res) {
									this.modalRegistroIEA = true;
								}
							});
						}
					);
			} else {
				this.msgBox(
					'Dominio no válido',
					'La cuenta no pertenece al dominio @iea.edu.mx'
				);
			}
		},
	},
};
</script>

<style lang="css">
.titulo {
	text-align: center;
	margin-top: 20px;
}
.animcolorAzul {
	background-color: rgba(29, 0, 107, 0.767);
	cursor: pointer;
	transition: 1s;
}
.animcolorAzul:hover {
	background-color: rgb(218, 0, 125);
}
.animcolorGris {
	background-color: rgba(99, 99, 99, 0.767);
	cursor: pointer;
	transition: 1s;
}
.animcolorGris:hover {
	background-color: rgb(182, 211, 80);
}
</style>
