curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target 
aws codestar-connections create-connection --provider-type GitHub --connection-name github-connection

cdk bootstrap 699787521567/us-west-2 --profile beta --trust 482386125080 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess

