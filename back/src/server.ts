import "reflect-metadata"; 
import express, { Application } from "express";
import cors from "cors";
import router from "./router"; 
import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs";
import morgan from "morgan";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/", router);

AppDataSource.initialize()
  .then(() => {
    console.log("📡 Base de datos conectada");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a la base de datos", error);
  });

  export default app;