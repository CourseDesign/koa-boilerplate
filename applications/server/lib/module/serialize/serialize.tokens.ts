import { Token } from "cheeket";
import {
  DateSerializer,
  SerializerManager,
  ArraySerializer,
} from "./serializer";

const SerializeTokens = Object.freeze({
  SerializerManager: Symbol(
    "Serializer@SerializerManager"
  ) as Token<SerializerManager>,
  DateSerializer: Symbol("Serializer@DateSerializer") as Token<DateSerializer>,
  ArraySerializer: Symbol("Serializer@ArraySerializer") as Token<
    ArraySerializer<unknown>
  >,
});

export default SerializeTokens;
