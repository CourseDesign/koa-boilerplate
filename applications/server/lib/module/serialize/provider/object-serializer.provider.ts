import { Provider, Token } from "cheeket";
import { ObjectSerializer, Serializer } from "../serializer";

// eslint-disable-next-line @typescript-eslint/ban-types
function objectSerializerProvider<T extends object>(
  serializerToken: Token<Serializer<unknown>>
): Provider<ObjectSerializer<T>> {
  return async (context) => {
    const serializer = await context.resolve(serializerToken);
    return new ObjectSerializer(serializer);
  };
}

export default objectSerializerProvider;
