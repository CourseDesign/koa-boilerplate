import { Token } from "cheeket";
import { DateSerializer, SerializerManager } from "./serializer";

const SerializeTokens = Object.freeze({
  SerializerManager: Symbol(
    "Serializer@SerializerManager"
  ) as Token<SerializerManager>,
  DateSerializer: Symbol("Serializer@DateSerializer") as Token<DateSerializer>,
});

export default SerializeTokens;
