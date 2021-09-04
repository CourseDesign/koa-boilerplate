import { Provider } from "cheeket";
import { NotPassSerializer } from "../serializer";

function notPassSerializerProvider<T>(): Provider<NotPassSerializer<T>> {
  return () => new NotPassSerializer();
}

export default notPassSerializerProvider;
