
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.29"
    }
  }

  required_version = ">= 1.2.0"
}


resource "aws_s3_bucket" "salve_dpp_web" {
  bucket_prefix = var.bucket_prefix
  acl           = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

module "template_files" {
  source = "hashicorp/dir/template"

  base_dir = "${path.module}/build"
}


resource "aws_s3_bucket_object" "static_files" {
  for_each     = module.template_files.files
  bucket       = aws_s3_bucket.salve_dpp_web.bucket
  key          = each.key
  content_type = each.value.content_type
  source       = each.value.source_path
  etag         = each.value.digests.md5
}


resource "aws_s3_bucket_policy" "salve_dpp_web" {
  bucket = aws_s3_bucket.salve_dpp_web.id
  policy = <<POLICY
{    
    "Version": "2012-10-17",    
    "Statement": [        
      {            
          "Sid": "PublicReadGetObject",            
          "Effect": "Allow",            
          "Principal": "*",            
          "Action": [                
             "s3:GetObject"            
          ],            
          "Resource": [
             "arn:aws:s3:::${aws_s3_bucket.salve_dpp_web.id}/*"            
          ]        
      }    
    ]
}
POLICY
}