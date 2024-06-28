import { Stack, StackProps } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { HitCounter } from "./hitcounter";
import { TableViewer } from "cdk-dynamo-table-viewer";

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new Function(this, "HelloHandler", {
      runtime: Runtime.NODEJS_18_X, // execution environment
      code: Code.fromAsset("lambda"), // code loaded from "lambda" directory
      handler: "hello.handler", // file is "hello", function is "handler"
    });

    const helloWithCounter = new HitCounter(this, "HelloHitCounter", {
      downstream: hello,
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    const gateway = new LambdaRestApi(this, "Endpoint", {
      handler: helloWithCounter.handler,
    });

    const tv = new TableViewer(this, "ViewHitCounter", {
      title: "Hello Hits",
      table: helloWithCounter.table,
      sortBy: '-hits'
    });
  }
}


/*

import { Stack, StackProps } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { HitCounter } from "./hitcounter";

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new Function(this, "HelloHandler", {
      runtime: Runtime.NODEJS_18_X, // execution environment
      code: Code.fromAsset("lambda"), // code loaded from "lambda" directory
      handler: "hello.handler", // file is "hello", function is "handler"
    });

    const helloWithCounter = new HitCounter(this, "HelloHitCounter", {
      downstream: hello,
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    const gateway = new LambdaRestApi(this, "Endpoint", {
      handler: helloWithCounter.handler,
    });
  }
}

*/

/*

import { Stack, StackProps } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new Function(this, "HelloHandler", {
      runtime: Runtime.NODEJS_18_X, // execution environment
      code: Code.fromAsset("lambda"), // code loaded from "lambda" directory
      handler: "hello.handler", // file is "hello", function is "handler"
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    const gateway = new LambdaRestApi(this, "Endpoint", {
      handler: hello,
    });
  }
}

*/

/*

import { Stack, StackProps } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new Function(this, "HelloHandler", {
      runtime: Runtime.NODEJS_18_X, // execution environment
      code: Code.fromAsset("lambda"), // code loaded from "lambda" directory
      handler: "hello.handler", // file is "hello", function is "handler"
    });
  }
}

*/

/* 

import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';



export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props); // calls parents class Stack to ensure base config is set up. It's then extended upon as the code is in the constructor

    // const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
    //   visibilityTimeout: Duration.seconds(300)
    // });

    // const topic = new sns.Topic(this, 'CdkWorkshopTopic');

    // topic.addSubscription(new subs.SqsSubscription(queue));


  }
}

*/

// GUIDE

/* 

Order:

- cdk init sample-app --language typescript --> start the sample typescript project

- cdk synth --> AWS CDK apps are effectively only a definition of your infrastructure using code. 
                When CDK apps are executed, they produce (or "synthesize", in CDK parlance) an AWS CloudFormation template for each stack defined in your application.
- cdk bootstrap --> The first time you deploy an AWS CDK app into an environment (account/region), you can install a "bootstrap stack". This stack includes resources that are used in the toolkit's operation. 
                    For example, the stack includes an S3 bucket that is used to store templates and assets during the deployment process. Creates CDKToolkit https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringText=&filteringStatus=active&viewNested=true
- cdk deploy --> Deploy the stack to your default AWS account/region.
- cdk diff --> Compare what's currently deployed to what's in the stack code. Delete some code in the stack and run this to see the difference.
- cdk deploy --hotswap --> Skip creating the cloudformation template, uses API call to directly change the deployed resource. This is particularly useful for iterative development and testing of resources like AWS Lambda functions, 
                          where you frequently make code changes and want to see the effects immediately.

Useful commands

npm run build compile typescript to js.
npm run watch watch for changes and compile.
npm run test perform the jest unit tests.
cdk deploy deploy this stack to your default AWS account/region.
cdk diff compare deployed stack with current state.
cdk synth emits the synthesized CloudFormation template.

What files do:

lib/cdk-workshop-stack.ts is where your CDK application's main stack is defined. This is the file we'll be spending most of our time in.
bin/cdk-workshop.ts is the entrypoint of the CDK application. It will load the stack defined in lib/cdk-workshop-stack.ts.
package.json is your npm module manifest. It includes information like the name of your app, version, dependencies and build scripts like "watch" and "build" (package-lock.json is maintained by npm)
cdk.json tells the toolkit how to run your app. In our case it will be "npx ts-node bin/cdk-workshop.ts"
tsconfig.json your project's typescript configuration 
.gitignore and .npmignore tell git and npm which files to include/exclude from source control and when publishing this module to the package manager.
node_modules is maintained by npm and includes all your project's dependencies.

*/

/*

A word about constructs and constructors
As you can see, the class constructors of both CdkWorkshopStack and lambda.Function (and many other classes in the CDK) have the signature (scope, id, props). This is because all of these classes are constructs. Constructs are the basic building block of CDK apps. They represent cloud component abstractions which can be composed together into higher level abstractions via scopes. Scopes can include constructs, which in turn can include other constructs, etc.

Constructs are always created in the scope of another construct and must always have an identifier which must be unique within the scope it's created. Therefore, construct initializers (constructors) will always have the following signature:

scope: the first argument is always the scope in which this construct is created. In almost all cases, you'll be defining constructs within the scope of current construct, which means you'll usually just want to pass this for the first argument.

id: the second argument is the local identity of the construct. It's an ID that has to be unique among constructs within the same scope. The CDK uses this identity to calculate the CloudFormation Logical ID  for each resource defined within this scope. To read more about IDs in the CDK, see the CDK user manual .

props: the last (sometimes optional) argument is always a set of initialization properties. Those are specific to each construct. For example, the lambda.Function construct accepts properties like runtime, code and handler. You can explore the various options using your IDE's auto-complete or in the online documentation .

*/

// https://1h6qvung16.execute-api.us-east-1.amazonaws.com/prod/