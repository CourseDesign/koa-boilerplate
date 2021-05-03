import Application from "koa";
import { Commit, getLastCommit } from "git-last-commit";

import Context from "../context";
import State from "../state";

const START_TIME = new Date();

function findLastCommit(): Promise<Commit | undefined> {
  return new Promise<Commit | undefined>((resolve) => {
    getLastCommit((err, commit) => {
      if (err) return resolve(undefined);
      return resolve(commit);
    });
  });
}

function version(): Application.Middleware<State, Context> {
  let commit: string | undefined;

  return async (context, next) => {
    if (commit == null) {
      commit = (await findLastCommit())?.hash;
    }

    context.body = {
      version: process.env.npm_package_version,
      commit,
      startTime: START_TIME,
    };

    await next();
  };
}

export default version;
