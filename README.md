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

# CLOUD FORMATION
AWS CloudFormation provides a common language for you to describe and provision all the infrastructure resources in your cloud environment. CloudFormation allows you to use a simple text file to model and provision, in an automated and secure manner, all the resources needed for your applications across all regions and accounts. This file serves as the single source of truth for your cloud environment.  Ref. aws.amazon.com/cloudformation

1. VPC  (Virtual Private): This is the code for a vpc, the instance must be default to save costs. 10.0.0.0/16, Netmask: 255.255.0.0 = 16 11111111.11111111 .00000000.00000000. 
    * This a code for a vp
````json
            "vpcProjectAwsCourse": {
            "Type": "AWS::EC2::VPC",
            "Properties": {
                "CidrBlock": "10.0.0.0/16",
                "InstanceTenancy": "default",
                "Tags": [
                {
                    "Key": "Name",
                    "Value": "vpcProjectAwsCourse"
                }
                ]
            }
            },
```` 
2. Subnets: 
        For this case we need six subnets, 3 in one zone (us-east-2a) and 3 in another zone(us-east-2c).

        *Zona 1
        | Subnet Name        | CidrBlock        |AvailabilityZone |  Notes                                  |
        | -------------------| -----------------|-----------------|-----------------------------------------|
        | z1pubSubnet1       | 10.0.1.0/24      | us-east-2a      | Load balancer and Bastion Host          |
        | z1privSubnet1      | 10.0.2.0/24      | us-east-2a      | Ec2 Application                         |
        | z1privSubnet       | 10.0.3.0/24      | us-east-2a      | Rds                                     |
        
        *Zona 2
        | Subnet Name        | CidrBlock        |AvailabilityZone |  Notes                                  |
        | -------------------| -----------------|-----------------|-----------------------------------------|
        | z2pubSubnet1       | 10.0.4.0/24      | us-east-2c      | Load balancer                           |
        | z2privSubnet1      | 10.0.5.0/24      | us-east-2c      | Ec2 Application                         |
        | z2privSubnet       | 10.0.6.0/24      | us-east-2c      | Rds                                     |
        
````json        
            "z1pubSubnet1": {
                "DependsOn": ["vpcProjectAwsCourse"],
                "Type": "AWS::EC2::Subnet",
                "Properties": {
                    "VpcId": {
                    "Ref": "vpcProjectAwsCourse"
                    },
                    "MapPublicIpOnLaunch": false,
                    "CidrBlock": "10.0.1.0/24",
                    "AvailabilityZone": "us-east-2a",
                    "Tags": [
                    {
                        "Key": "Name",
                        "Value": "z1pubSubnet1"
                    }
                    ]
                }
                }
````
3. SecurityGroups: A security group acts as a virtual firewall for your instance to control inbound and outbound traffic. When you launch an instance in a VPC, you can assign up to five security groups to the instance. Security groups act at the instance level, not the subnet level. Therefore, each instance in a subnet in your VPC could be assigned to a different set of security groups. If you don't specify a particular group at launch time, the instance is automatically assigned to the default security group for the VPC. Ref https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html

*   We have 3 security groups
        | Group Name                | SecurityGroupIngress            |  SecurityGroupEgress            |  Notes            |
        | -------------------       | --------------------------------|---------------------------------|-------------------|
        | securityGroupVpcBastion   | All trafic (80,22)              | All trafic 80 and 22            | Bastion Host      |
        | securityGroupLoadBalancer | All trafic 80                   | All trafic 80                   | LoadBalancer      |
        | securityGroupVpcEc2       | 10.0.1.0/24,10.0.4.0/24(80,22)  | 10.0.1.0/24,10.0.4.0/24(80,22)  | Ec2 machine       |
        | securityGroupvpcRds       | 10.0.2.0/24,10.0.5.0/24(22,3306)| 10.0.2.0/24,10.0.5.0/24(22,3306)| Rds Database      |
````json        
"securityGroupVpcBastion": {
      "DependsOn": ["vpcProjectAwsCourse"],
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "VpcId": { "Ref": "vpcProjectAwsCourse" },
        "Tags": [{ "Key": "Name", "Value": "securityGroupVpcBastion" }],
        "GroupName": "securityGroupVpcBastion",
        "GroupDescription": "Bastion Host",
        "SecurityGroupIngress": [
          {
            "IpProtocol": "tcp",
            "FromPort": 80,
            "ToPort": 80,
            "CidrIp": "0.0.0.0/0"
          },
          {
            "IpProtocol": "tcp",
            "FromPort": 22,
            "ToPort": 22,
            "CidrIp": "0.0.0.0/0"
          }
        ],
        "SecurityGroupEgress": [
          {
            "IpProtocol": "tcp",
            "FromPort": 80,
            "ToPort": 80,
            "CidrIp": "0.0.0.0/0"
          },
          {
            "IpProtocol": "tcp",
            "FromPort": 22,
            "ToPort": 22,
            "CidrIp": "0.0.0.0/0"
          }
        ]
      }
    },
````    


