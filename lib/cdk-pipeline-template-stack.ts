import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, CodeBuildStep} from 'aws-cdk-lib/pipelines';
import * as codebuild from 'aws-cdk-lib/aws-codebuild'
import * as path from 'path';
import { PipelineAppStage } from './stage';

export class CdkPipelineTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const codestarConnectionArn = 'arn:aws:codestar-connections:us-west-2:482386125080:connection/9f0884a1-10c8-479e-9796-1ec621e3ffe4'
    const lambdaCodePipelineSource = CodePipelineSource.connection('newandimproved-dev/cdk-lambda-template', 'main', {
      connectionArn: codestarConnectionArn
    });

    const lambdaBuildStep = new CodeBuildStep('BuildLambda', {
      buildEnvironment: {
          buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_3
      },
      input: lambdaCodePipelineSource,
      commands: ['mvn clean install', 'mvn package']
  })
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      crossAccountKeys: true,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('newandimproved-dev/cdk-pipeline-template', 'main', {
          connectionArn: codestarConnectionArn
        }),
        additionalInputs: {
          'lambda': lambdaBuildStep.addOutputDirectory(path.join(__dirname, "out")),
        },
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    // pipeline.addStage(new PipelineAppStage(this, "beta", {
    //   env: { account: "550575751237", region: "us-west-2" }
    // }));
    // pipeline.addStage(new PipelineAppStage(this, "prod-us", {
    //   env: { account: "940414415893", region: "us-east-1" }
    // }));
    // pipeline.addStage(new PipelineAppStage(this, "prod-eu", {
    //   env: { account: "531280046950", region: "eu-west-1" }
    // }));
  }
}