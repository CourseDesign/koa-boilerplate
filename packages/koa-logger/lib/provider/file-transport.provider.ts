import { Provider } from "cheeket";
import { transport as Transport, transports } from "winston";

function fileTransportProvider(
  options?: transports.FileTransportOptions
): Provider<Transport> {
  return async () => new transports.File(options);
}

export default fileTransportProvider;
