#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPipelineTemplateStack } from '../lib/cdk-pipeline-template-stack';
import { devStage } from '../constants/pipeline-stages';

const app = new cdk.App();
new CdkPipelineTemplateStack(app, 'CdkPipelineTemplateStack', {
  env: { account: devStage.awsAccountId, region: devStage.awsRegionCode},
});
app.synth();