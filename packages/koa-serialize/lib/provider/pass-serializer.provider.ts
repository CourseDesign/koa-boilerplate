import { Provider } from "cheeket";
import { PassSerializer } from "../serializer";

function passSerializerProvider<T>(): Provider<PassSerializer<T>> {
  return () => new PassSerializer();
}

export default passSerializerProvider;
