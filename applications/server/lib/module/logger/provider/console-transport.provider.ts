import { Provider } from "cheeket";
import { transport as Transport, transports } from "winston";

function consoleTransportProvider(
  options?: transports.ConsoleTransportOptions
): Provider<Transport> {
  return async () => new transports.Console(options);
}

export default consoleTransportProvider;
