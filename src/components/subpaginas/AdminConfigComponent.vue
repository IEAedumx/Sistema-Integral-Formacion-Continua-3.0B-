<template>
    <div>
        <h3>Configuraciones de plataforma</h3>
        <hr/>
        <strong>Limitaciones de inscripcion por periodo de formación (periodoFC)</strong>
        <b-form-group
            id="periodo"
            label="Periodo a limitar:"
            label-for="peridoFC"
            description="Periodo descrito en Periodo de Formación de Grupo"
        >
            <b-form-input
                id="periodoFC"
                v-model="periodoFC"
                type="text"
                required
                placeholder="Escribe el periodo descrito en Periodo de Formación de Grupo"
            >
            </b-form-input>
        </b-form-group>
        <b-form-group
            label="Límite"
            label-for="regMax"
            description="Número máximo de registros por Periodo de Formación"
        >
            <b-form-input
                id="regMax"
                v-model="regMax"
                type="number"
                required
                placeholder="Escribe el número máximo de registros por Periodo de Formación"
            >
            </b-form-input>
        </b-form-group>
    </div>
</template>

<script>
export default {
    name: "AdminConfComponent",
    data: {
        periodoFC: "",
        regMax: 0,
    }
}
</script>