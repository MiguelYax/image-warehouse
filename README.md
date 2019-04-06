# IMAGE WAREHOUSE

Image warehouse allows upload, list, update and delete.

# REQUIREMENTS

Build a web application in the language of your choice that allows the
following:

1. Create a VPC with two public subnets and two private subnets.
2. Build a web application in the language of your choice that allows the following:
    * Create: Upload image to S3 bucket and store metadata in RDS
    * Retrieve: List images stored in S3 bucket and their metadata
    * Update: Update image and/or metadata
    * Delete: Delete image from S3 bucket and metadata from RDS
3. When the upload of the image is complete, trigger a Lambda function to create a thumbnail of that image and place it in another S3 bucket.
4. [Optional] Create a Github repository (if not created already) with the contents of the web application.
5. [Optional] Create all the infrastructure in CloudFormation.


# ARCHITECTURE

![Diagram](https://raw.githubusercontent.com/MiguelYax/image-warehouse/master/imagenes/arquitectura.PNG) 