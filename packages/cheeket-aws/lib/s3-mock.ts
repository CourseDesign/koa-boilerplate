/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
import AWSMock from "mock-aws-s3";

/*
 * 실제 인터페이스와 다른 점이 있어서 수정
 * */
class S3Mock extends AWSMock.S3 {
  getSignedUrlPromise(operation: string, params: never) {
    const result = this.getSignedUrl(operation, params) as unknown;
    return (result as any).promise();
  }
}

export default S3Mock;
