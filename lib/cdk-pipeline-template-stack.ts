import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, CodeBuildStep} from 'aws-cdk-lib/pipelines';
import * as codebuild from 'aws-cdk-lib/aws-codebuild'
import { PipelineAppStage } from './pipeline-app-stage';
import { allStages } from '../constants/pipeline-stages';
import { cdkGithubRepository, cdkGithubRepositoryBranch, codestarConnectionArn, lambdaGithubRepository, lambdaGithubRepositoryBranch } from '../constants/github-source-config';

export class CdkPipelineTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const cdkCodePipelineSource = CodePipelineSource.connection(cdkGithubRepository, cdkGithubRepositoryBranch, {
      connectionArn: codestarConnectionArn
    });

    const lambdaCodePipelineSource = CodePipelineSource.connection(lambdaGithubRepository, lambdaGithubRepositoryBranch, {
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
      pipelineName: 'CdkTemplatePipeline',
      crossAccountKeys: true,
      synth: new ShellStep('Synth', {
        input: cdkCodePipelineSource,
        additionalInputs: {
          'lambda': lambdaBuildStep.addOutputDirectory(''),
        },
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    for (var stage of allStages) {
      pipeline.addStage(new PipelineAppStage(this, stage.stageName, stage, {
        env: { account: stage.awsAccountId, region: stage.awsRegionCode }
      }));
    }
  }
}