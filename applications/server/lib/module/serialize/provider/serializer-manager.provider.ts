import { Provider } from "cheeket";
import { SerializerManager } from "../serializer";

function serializerManagerProvider(): Provider<SerializerManager> {
  return () => new SerializerManager();
}

export default serializerManagerProvider;
