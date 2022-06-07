#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPipelineTemplateStack } from '../lib/cdk-pipeline-template-stack';

const app = new cdk.App();
new CdkPipelineTemplateStack(app, 'CdkPipelineTemplateStack', {
  env: { account: '482386125080', region: 'us-west-2' },
});
app.synth();