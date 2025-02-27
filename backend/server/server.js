require("./config/config");
const path = require("path");
const compression = require("compression");
const jwt = require("./config/jwt/jwt");
const expressUpload = require("express-fileupload");

//********************** Librerias para SSL (Activar para publicar en producción y comentar en local) *********************** */
// /**
//  * Librerias para SSL
//  */
// const https = require("https");
// const fs = require("fs");
// const HTTPS_OPTIONS = {
//   pfx: fs.readFileSync("./ssl/star_iea_edu_mx_2023.pfx"),
//   passphrase: "1EAc3rt250923",
// };
/***************************************************************************************************************************** */


/**
* Librerias http
*/
const http = require("http");

/**
 * Librerias express y mongoose
 */
const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  app = express();
app.use(compression());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.set("views", express.static(__dirname + "/server/views"));
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb://localhost:27017/SERFC_DB",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) throw err;
    console.log("Conexion establecida con la BD");
  }
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//----------------------------- Carpeta de archivos públicos -------------------------
app.use("/backassets", express.static(path.join(__dirname, "../public")));
//---------------------------- Middleware para carga de archivos ----------------------
app.use(expressUpload());

//---------------------------- Directorio web estático -----------------------------
app.use("/", express.static(__dirname + "/dist2"));
//app.use('/', express.static(__dirname + '/dist'));

//----------------------  Descarga archivos en base64 --------------------------/
app.use(require("./routes/base64encode.route"));

//--------------------- Serviicios Especiales API de servidor------------------/
app.use(require("./routes/valida.route"));
app.use(require("./routes/googleAuth.route"));

app.use(require("./routes/upload_files.route"));
app.use(require("./routes/mongodump.route"));
app.use(require("./routes/sippe.route"));

/**
 *
 * Esta ruta es exclusiva para el sistema de cambios de CT
 *
 **/
app.use(require("./routes/cambiosCt.route"));
app.use(require("./routes/cctsAgs.route"));

/**
 *
 * Rutas para el SIFC
 *
 * */
app.use(jwt());
app.use(require("./routes/personal_nomina.route"));
app.use(require("./routes/instituciones_formadoras.route"));
app.use(require("./routes/modalidad.route"));
app.use(require("./routes/niveles_educativos.route"));
app.use(require("./routes/oferta_formacion.route"));
app.use(require("./routes/perfiles.route"));
app.use(require("./routes/periodicidad.route"));
app.use(require("./routes/presupuesto.route"));
app.use(require("./routes/registro.route"));
app.use(require("./routes/tipos_oferta.route"));
app.use(require("./routes/usuario.route"));
app.use(require("./routes/preparacion.route.js"));
/***
 * Rutas para AT ATP
 */
//app.use(require("./routes/at_atp/usuarios_at_atp.route"));



/*************************** Servicio SSL (Activar para publicar en producción y comentar en local) **************************** */
// /**
//  * Servicio SSL
//  */
// https.createServer(HTTPS_OPTIONS, app).listen(443, () => {
//   console.log("**La aplicación esta corriendo en SSL (HTTPS)");
// });

// /**
//  * Servicio sin certificado SSL
//  */
// http.createServer(function (req, res) {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//     res.end();
// }).listen(80);
/******************************************************************************************************************************* */


app.listen(3000, () => {
    console.log(`La aplicación esta corriendo en el puerto ${process.env.PORT}`);
});
