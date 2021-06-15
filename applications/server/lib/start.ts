import bootstrap from "./bootstrap";
import { ConfigProvider } from "./config";

const configProvider = new ConfigProvider();
bootstrap(configProvider.get()).then(() => {});
