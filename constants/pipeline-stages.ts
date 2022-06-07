import { Stage } from "../constants/stage"

const dev = '482386125080'

const beta = '699787521567'

export const devStage : Stage = {
    awsAccountId: dev, 
    awsRegionCode: 'us-west-2',
    stageName: 'dev'
}

export const betaStage : Stage = {
    awsAccountId: beta, 
    awsRegionCode: 'us-west-2',
    stageName: 'beta'
}

export const allStages = [devStage, betaStage]