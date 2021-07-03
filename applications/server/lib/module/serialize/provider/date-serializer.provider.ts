import { Provider } from "cheeket";
import { DateSerializer } from "../serializer";

function dateSerializerProvider(): Provider<DateSerializer> {
  return () => new DateSerializer();
}

export default dateSerializerProvider;
