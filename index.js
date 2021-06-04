require('dotenv').config();

const Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint: process.env.ENDPOINT,
    port: Number.parseInt(process.env.PORT),
    useSSL: process.env.USE_SSL === 'true',
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY
});

const walk = require('walk');
const minioBucket = process.env.BUCKET;

const walker = walk.walk('files');
const errors = [];
walker.on('file', (root, fileStats, next) => {
    if (fileStats.name === '.gitignore') {
        next();
    } else {
        const filePath = `${process.cwd()}/${root}/${fileStats.name}`;
        const minioPath = `${root}/${fileStats.name}`.replace(`files/`, '');
        console.log('Upload', filePath, minioPath)
        minioClient.fPutObject(minioBucket, minioPath, filePath, err => {
            console.log(filePath, ' uploaded');
            if (err) {
                console.error(err);
                errors.push(filePath);
            }
            next()
        })
    }
})

walker.on('end', function () {
    console.log('End upload');
    if (errors.length > 0) {
        console.log('There where errors uploading these files:');
        errors.forEach(error => console.log(error));
    }
})