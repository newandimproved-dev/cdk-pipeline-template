import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { Stage } from '../constants/stage';
import { ApplicationStack } from './application-stack';

export class PipelineAppStage extends cdk.Stage {
    
    constructor(scope: Construct, id: string, stage: Stage, props?: cdk.StageProps) {
      super(scope, id, props);
      const applicationStackId = `ApplicationStack-${stage.awsRegionCode}`;
      const applicationStack = new ApplicationStack(this, applicationStackId, stage, props);      
    }
}