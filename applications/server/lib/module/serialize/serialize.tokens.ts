import { Token } from "cheeket";
import {
  DateSerializer,
  SerializerManager,
  ArraySerializer,
  SetSerializer,
  MapSerializer,
} from "./serializer";

const SerializeTokens = Object.freeze({
  SerializerManager: Symbol(
    "Serializer@SerializerManager"
  ) as Token<SerializerManager>,
  DateSerializer: Symbol("Serializer@DateSerializer") as Token<DateSerializer>,
  ArraySerializer: Symbol("Serializer@ArraySerializer") as Token<
    ArraySerializer<unknown>
  >,
  SetSerializer: Symbol("Serializer@SetSerializer") as Token<
    SetSerializer<unknown>
  >,
  MapSerializer: Symbol("Serializer@MapSerializer") as Token<
    MapSerializer<never, unknown>
  >,
});

export default SerializeTokens;
