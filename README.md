# Welcome to your CDK TypeScript project

Lab instructions are [here](https://cdkworkshop.com/20-typescript.html). Lab was completed on 26th June 2024 at [UK Public Sector - Unlock Cloud Development Mastery with the AWS CDK Immersion Day](https://aws-experience.com/emea/uki/e/6010f/uk-public-sector---unlock-cloud-development-mastery-with-the-aws-cdk-immersion-day)

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkWorkshopStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Note
If `aws-cdk` CLI is not globally installed, run `npm install` to install dependencies and then use `npx cdk deploy/diff/synth` to use the local version of `aws-cdk` CLI
