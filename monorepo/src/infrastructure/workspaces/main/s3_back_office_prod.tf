resource "aws_s3_bucket" "back_office_prod" {
  bucket = "backoffice.cleangreen.se"
  acl    = "private"

  tags = {
    Environment = "prod"
    Name        = "Backoffice Production"
  }
}

resource "aws_s3_bucket_policy" "back_office_prod" {
  bucket = aws_s3_bucket.back_office_prod.id

  policy = <<EOT
{
  "Version": "2012-10-17",
  "Id": "PolicyForCloudFrontPrivateContent",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
          "AWS": "${aws_cloudfront_origin_access_identity.back_office_prod.iam_arn}"
      },
      "Action": "s3:GetObject",
      "Resource": [
        "${aws_s3_bucket.back_office_prod.arn}",
        "${aws_s3_bucket.back_office_prod.arn}/*"
      ]
    }
  ]
}
EOT
}
