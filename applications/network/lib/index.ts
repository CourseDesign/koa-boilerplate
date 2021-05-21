import bootstrap from "./bootstrap";
import ConfigurationProvider from "./configuration-provider";

const configProvider = new ConfigurationProvider({ port: 8080 });
bootstrap(configProvider.get()).then(() => {});
