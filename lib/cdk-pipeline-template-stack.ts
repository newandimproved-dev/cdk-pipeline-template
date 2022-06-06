import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineAppStage } from './stage';

export class CdkPipelineTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      crossAccountKeys: true,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('newandimproved-dev/cdk-pipeline-template', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-west-2:714496019310:connection/769cf32f-d119-4779-859b-77a3f0650947'
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    pipeline.addStage(new PipelineAppStage(this, "beta", {
      env: { account: "550575751237", region: "us-west-2" }
    }));
  }
}