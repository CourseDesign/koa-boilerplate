import { Provider, Token } from "cheeket";
import { ArraySerializer, Serializer } from "../serializer";

function arraySerializerProvider<T>(
  serializerToken: Token<Serializer<unknown>>
): Provider<ArraySerializer<T>> {
  return async (context) => {
    const serializer = await context.resolve(serializerToken);
    return new ArraySerializer(serializer);
  };
}

export default arraySerializerProvider;
