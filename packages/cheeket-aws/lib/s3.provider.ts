import { interfaces } from "cheeket";
import * as AWS from "aws-sdk";
import S3Mock from "./s3-mock";

function s3Provider(
  configuration: AWS.S3.ClientConfiguration | { mock: true }
): interfaces.Provider<AWS.S3> {
  return () => {
    if ((configuration as { mock: true }).mock) {
      return new S3Mock();
    }
    return new AWS.S3(configuration as AWS.S3.ClientConfiguration);
  };
}

export default s3Provider;
