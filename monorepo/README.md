# We clean green
### api-core
The rest API

#### Run locally
Create a local version of the .env.local by executing `cd src/api-core && cp .env.example .env.local` and edit the values

To run the backend server
```bash
cd src/api-core
docker-compose build && docker-compose up -d
```

To review the api docs, visit http://localhost:8080/api-docs

#### Add development data to database from seed
Make sure to be in the api-core folder and run 
```bash
npm run seeds:development -- email=[YOUR_NAME]@cleangreen.se
```
where you type in your email address.

### AWS
AWS Setup
- RDS postgresql
- ECR
- ECS Fargate
- Application load balancer

### functions 
#### Populate booking
A cron job what will run on daily basis and populate bookings from frame bookings by making a api request to a core-api endpoint.

AWS setup
- Labdda & Serverless 

### frontend-admin
The backoffice website

AWS Setup
- S3
- Cloudfront
All requests must be redirected to `index.html`

