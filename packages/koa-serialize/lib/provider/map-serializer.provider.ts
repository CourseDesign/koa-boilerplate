import { Provider, Token } from "cheeket";
import { MapSerializer, Serializer } from "../serializer";

// eslint-disable-next-line @typescript-eslint/ban-types
function mapSerializerProvider<K extends Object, V>(
  serializerToken: Token<Serializer<unknown>>
): Provider<MapSerializer<K, V>> {
  return async (context) => {
    const serializer = await context.resolve(serializerToken);
    return new MapSerializer(serializer);
  };
}

export default mapSerializerProvider;
