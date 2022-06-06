curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target 
aws codestar-connections create-connection --provider-type GitHub --connection-name github-connection
