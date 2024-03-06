# Stuffed Animal Dating App (Stitch)

## Architecture

<img src="https://github.com/Mcbuzzerr/stuffed-animal-dating-app/blob/main/Diagrams/serviceDiagram2.png" alt="Architecture" width="500px" />

## Env variables

auth-api
```yaml
jwt_secret_key
```
email-service
```yaml
MAIL_PASSWORD
MAIL_FROM
MAIL_PORT
MAIL_SERVER
```
profile-api
```yaml
jwt_secret_key #same as auth-api secret key
CLOUD_NAME
CLOUDINARY_SECRET
CLOUDINARY_API_KEY
```
