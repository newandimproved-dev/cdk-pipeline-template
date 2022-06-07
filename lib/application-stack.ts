import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, InlineCode, Runtime } from 'aws-cdk-lib/aws-lambda';

export class ApplicationStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      new Function(this, 'LambdaFunction', {
        runtime: Runtime.JAVA_11,
        handler: 'CdkLambdaTemplate.Handler',
        code: Code.fromAsset("")
      });
    }
}