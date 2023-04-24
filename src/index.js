import express from "express";
import productRouter from "./routes/product.routes.js";
import multer from "multer";
import { __dirname } from "./path.js";

//Configuro de express
const app = express();
const PORT = 4000;
//Multer:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname} `);
  },
});

//Middlewares:
app.use(express.json()); //Permite ejecutar JSON en mi app
app.use(express.urlencoded({ extended: true })); //Permite poder realizar consultas en la URL (req.query)
const upload = multer({ storage: storage });

//Routes
app.use("/product", productRouter);
app.use("/static", express.static(__dirname + "/public"));
app.post("/upload", upload.single("product"), (req, res) => {
  //Imagenes
  console.log(req.body);
  console.log(req.file);
  res.send("Imagen subida");
}); // Genero una ruta especificamente para la carga de las imagenes

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
