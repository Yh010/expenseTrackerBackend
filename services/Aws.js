const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config({ path: '.env.local' });
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3Client = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId:process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey
    }
 });

/**
 * @description Generated a signed and a public URLs for a given file name
 * @param filename File name including file extension
 * @param bucketPath Folder path in S3
 * @returns {publicUrl: string, signedUrl: string}
 */
const generateUrl = async (filename, bucketPath) => {
    let signedUrl;
    const publicUrl = getPublicUrl(filename, bucketPath);
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${bucketPath}/${filename}`,
        Expires: 60 // URL expiry in seconds
    };

    try {
        
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: `${bucketPath}/${filename}`,
            
        });

        signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    } catch (err) {
        console.error(`Error generating pre-signed URL: ${err.message}`);
        throw new Error('Error generating pre-signed URL');
    }

    return { signedUrl, publicUrl };
};

/**
 * @description generates a public URL
 * @param filename File name including file extension
 * @param bucketPath Folder path to file
 * @returns {string}
 */
const getPublicUrl = (filename, bucketPath) => {
    return `https://${BUCKET_NAME}.s3.amazonaws.com/${bucketPath}/${filename}`;
};

module.exports = { generateUrl };
