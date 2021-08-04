Cloud Run Environment Variables Setter
---

_Automatically set the enviroment variables of a cloud run instance from a local .env file_

## Why
[Google Cloud Run](https://console.cloud.google.com/run) allows for easy and fast deployment of (micro)services,
but adding their environment variables can take a while. Especially if your services requires many.

This tool helps by allowing you to set the service's environment variables based on a local environment file.

![Cloud Run Environment Variables Window](img/example.png)

👆 No fun...