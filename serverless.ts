import type { AWS } from '@serverless/typescript';

import app from '@functions/app';

const serverlessConfiguration: AWS = {
  service: 'jyclog-serverless-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'ap-northeast-2',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_HOST: '127.0.0.1',
      DB_USER: 'root',
      DB_PASSWORD: '10241207',
      DB_DATABASE: 'jyclog',
      ADMIN_GITHUB_ID: '80824142'
    },
  },
  // import the function via paths
  functions: { app },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
