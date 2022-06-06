import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class CdkPipelineTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('newandimproved-dev/cdk-pipeline-template', 'main', {
          connectionArn: '', 
          triggerOnPush: true
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
  }
}
