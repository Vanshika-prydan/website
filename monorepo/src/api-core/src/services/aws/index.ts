import AWS from 'aws-sdk';

AWS.config.credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
};

export const AWS_REGION = 'eu-north-1';

AWS.config.update({
  region: AWS_REGION,
});

export default AWS;
