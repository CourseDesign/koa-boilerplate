import Application from "koa";
import { Commit, getLastCommit } from "git-last-commit";

import Context from "./context";
import State from "./state";

function findLastCommit(): Promise<Commit | undefined> {
  return new Promise<Commit | undefined>((resolve) => {
    getLastCommit((err, commit) => {
      if (err) return resolve(undefined);
      return resolve(commit);
    });
  });
}

const versionMiddleware: Application.Middleware<State, Context> = async (
  context,
  next
) => {
  context.body = {
    version: process.env.npm_package_version,
    commit: (await findLastCommit())?.hash,
  };

  await next();
};

export default versionMiddleware;
