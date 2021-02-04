const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "magaliimageboard", //my own bucket
            ACL: "public-read", //basically people can view this filepublic
            Key: `${req.session.userId}/${filename}`,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise(); //this makes it returns any promises

    promise
        .then(() => {
            console.log("amazon upload complete :)");
            next();
            fs.unlink(path, () => {});
        })
        .catch((err) => {
            console.log("Something went wrong in uploading to S3", err);
            res.statusCode(404);
        });
};

module.exports.delete = async function (id) {
    try {
        const { Contents } = await s3
            .listObjectsV2({
                Bucket: "magaliimageboard",
                Prefix: `${id}`,
            })
            .promise();

        if (Contents.length > 0) {
            console.log("there is image here");
            const toDelete = Contents.map((element) => {
                return {
                    Key: element.Key,
                };
            });
            const { Deleted } = await s3
                .deleteObjects({
                    Bucket: "magaliimageboard",
                    Delete: {
                        Objects: toDelete,
                    },
                })
                .promise();
            console.log("S3 delete objects worked", Deleted);
        } else {
            console.log("S3 no objects, but worked");
        }
    } catch (error) {
        console.log("error in s3 delete", error);
    }
};
