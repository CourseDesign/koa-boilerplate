import { Token } from "cheeket";
import { SerializerManager } from "./serializer";

const SerializeTokens = Object.freeze({
  SerializerManager: Symbol(
    "Serializer@SerializerManager"
  ) as Token<SerializerManager>,
});

export default SerializeTokens;
