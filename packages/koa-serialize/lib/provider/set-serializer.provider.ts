import { Provider, Token } from "cheeket";
import { Serializer, SetSerializer } from "../serializer";

function setSerializerProvider<T>(
  serializerToken: Token<Serializer<unknown>>
): Provider<SetSerializer<T>> {
  return async (context) => {
    const serializer = await context.resolve(serializerToken);
    return new SetSerializer(serializer);
  };
}

export default setSerializerProvider;
