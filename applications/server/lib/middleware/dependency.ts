import { DefaultState, Middleware } from "koa";
import compose from "koa-compose";
import { Container } from "cheeket";
import { modules } from "cheeket-koa-module";
import { ContainerContext } from "cheeket-koa";

function dependency(
  container: Container
): Middleware<DefaultState, ContainerContext> {
  return compose([dependency(container), modules()]) as Middleware<
    DefaultState,
    ContainerContext
  >;
}

export default dependency;
