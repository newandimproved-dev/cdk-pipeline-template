import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Stage } from '../constants/stage';
import {lambdaArtifactId} from '../constants/lambda-config'

export class ApplicationStack extends cdk.Stack {
    constructor(scope: Construct, id: string, stage: Stage, props?: cdk.StackProps) {
      super(scope, id, props);
      const lambdaId = `LambdaFunction-${stage.awsRegionCode}`;
      new Function(this, lambdaId, {
        runtime: Runtime.JAVA_11,
        handler: 'CdkLambdaTemplate.Handler',
        code: Code.fromAsset(`lambda/target/${lambdaArtifactId}-1.0-SNAPSHOT.jar`)
      });
    }
}