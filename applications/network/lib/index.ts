import bootstrap from "./bootstrap";

const port = process.env.PORT !== undefined ? Number(process.env.PORT) : 8080;
bootstrap(port).then(() => {});
