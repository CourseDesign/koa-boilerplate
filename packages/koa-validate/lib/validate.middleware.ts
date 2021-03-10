import Application from "koa";
import { Position } from "koa-position";
import { Schema } from "joi";
import { BadRequestError } from "@http/errors";

function validate(position: Position, schema: Schema): Application.Middleware {
  return async (context, next) => {
    const value = await position.extract(context);
    try {
      await schema.validateAsync(value);
    } catch (e) {
      throw new BadRequestError(e.message, e.details);
    }

    await next();
  };
}

export default validate;
