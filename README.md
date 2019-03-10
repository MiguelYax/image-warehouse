# IMAGE WAREHOUSE

Image warehouse allows upload, list, update and delete.

# REQUIREMENTS

Build a web application in the language of your choice that allows the
following:

1. Create: Upload image to S3 bucket and store metadata in RDS
2. Retrieve: List images stored in S3 bucket and their metadata
3. Update: Update image and/or metadata
4. Delete: Delete image from S3 bucket and metadata from RDS

# CERTIFICATE

Generating a self-signed certificate using OpenSSL

```
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```

```
openssl x509 -text -noout -in certificate.pem
```

```
 openssl pkcs12 -inkey key.pem -in certificate.pem -export -out certificate.p12
```

```
openssl pkcs12 -in certificate.p12 -noout -info

```
