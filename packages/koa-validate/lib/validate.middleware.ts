import Application from "koa";
import { Position } from "koa-position";
import { Schema } from "joi";
import { BadRequest } from "http-errors";

function validate(position: Position, schema: Schema): Application.Middleware {
  return async (context, next) => {
    const value = await position.extract(context);
    try {
      await schema.validateAsync(value);
    } catch (e) {
      throw new BadRequest(e.message);
    }

    await next();
  };
}

export default validate;
