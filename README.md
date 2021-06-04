# SMTH - Minio Uploader

Simple node project that uploads all the files in a folder to a **Minio** bucket, maintaining the scaffolding

## Configuration

Copy the file `.env.example` to `.env` and set the parameters based on you needs:

* **ENDPOINT** the endpoint of your minio server
* **PORT** the port of the endpoint (usually 9000)
* **USE_SSL** if you are using SSL or not
* **ACCESS_KEY** access key of your minio endpoint
* **SECRET_KEY** secret key of your minio endpoint
* **BUCKET** bucket where to upload the files

### Running

After `npm install` and the **Configuration** step, you copy your files in the `files` folder and launch the `upload` command from `package.json`: you will see the logs of the files uploaded one by one. The scaffolding inside the `files` folder will be reproduced on the bucket.

If there are errors, they will be printed at the end of the upload process, listing all the failed files.
