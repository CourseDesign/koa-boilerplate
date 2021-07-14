import { Token } from "cheeket";
import {
  DateSerializer,
  SerializerManager,
  ArraySerializer,
  SetSerializer,
  MapSerializer,
  PassSerializer,
  NotPassSerializer,
  ObjectSerializer,
} from "./serializer";

const SerializeTokens = Object.freeze({
  SerializerManager: Symbol(
    "Serializer@SerializerManager"
  ) as Token<SerializerManager>,

  PassSerializer: Symbol("Serializer@PassSerializer") as Token<
    PassSerializer<unknown>
  >,
  NotPassSerializer: Symbol("Serializer@NotPassSerializer") as Token<
    NotPassSerializer<unknown>
  >,

  DateSerializer: Symbol("Serializer@DateSerializer") as Token<DateSerializer>,
  ObjectSerializer: Symbol("Serializer@ObjectSerializer") as Token<
    // eslint-disable-next-line @typescript-eslint/ban-types
    ObjectSerializer<object>
  >,
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
