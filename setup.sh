curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target 
aws codestar-connections create-connection --provider-type GitHub --connection-name github-connection

cdk bootstrap 940414415893/us-east-1 --profile PROD_US --trust 714496019310 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess

