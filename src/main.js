import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';


import PrincipalComponent from './components/PrincipalComponent'
import ContactoComponent from './components/ContactoComponent'
import DashboardComponent from './components/DashboardComponent'
import PerfilComponent from './components/subpaginas/PerfilComponent'
import OfertaDispComponent from './components/subpaginas/OfertaDispComponent'
import AdminInstanciasComponent from './components/subpaginas/AdminInstanciasComponent'
import AdminOfertaFomComponent from './components/subpaginas/AdminOfertasFormComponent'
import AdminGruposComponent from './components/subpaginas/AdminGruposComponent'
import MiFormacionComponent from './components/subpaginas/MiFormacionComponent'
import AdminCargaMasivaComponent from './components/subpaginas/AdminCargaMasivaComponent'
import AdminUsuariosComponent from './components/subpaginas/AdminUsuariosComponent'
import AdminRegistrosComponent from './components/subpaginas/AdminRegistrosComponent'
import AdminReportesComponent from './components/subpaginas/AdminReportesComponent'

import GAuth from 'vue-google-oauth2'
const gauthOption = {
    //clientId: 'C851437264401-e9hq0rhc6tb5eg7eqn4933f22bh89m86.apps.googleusercontent.com',
    clientId: '629365982610-pfb04nvqaontq9ap97rn4al4g5t8qenh.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}
console.log(GAuth,gauthOption)
Vue.use(GAuth, gauthOption)
//---------Variables globales-------------
Vue.prototype.$usuario = function(usuario) {
    this.usuario = usuario
};
window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: PrincipalComponent
}, {
    path: '/contacto',
    component: ContactoComponent
}, {
    path: '/dashboard/:id?',
    component: DashboardComponent,
    children: [{
        path: 'perfil',
        component: PerfilComponent
    }, {
        path: 'ofertaDisp',
        component: OfertaDispComponent
    }, {
        path: 'miFormacion',
        component: MiFormacionComponent
    }, {
        path: 'adminOfertas',
        component: AdminOfertaFomComponent
    }, {
        path: 'adminInstancias',
        component: AdminInstanciasComponent
    }, {
        path: 'adminGrupos',
        component: AdminGruposComponent
    }, {
        path: 'adminCargaMasiva',
        component: AdminCargaMasivaComponent
    }, {
        path: 'adminUsuarios',
        component: AdminUsuariosComponent
    }, {
        path: 'adminRegistros',
        component: AdminRegistrosComponent
    }, {
        path: 'adminReportes',
        component: AdminReportesComponent
    }]
}];

const router = new VueRouter({
    routes,
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')