import bootstrap from "./bootstrap";

bootstrap(Number(process.env.PORT) ?? 8080).then(() => {});
