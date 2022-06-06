#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPipelineTemplateStack } from '../lib/cdk-pipeline-template-stack';

const app = new cdk.App();
new CdkPipelineTemplateStack(app, 'CdkPipelineTemplateStack', {
  env: { account: '714496019310', region: 'us-west-2' },
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
app.synth();