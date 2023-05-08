
import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)



const region = "ap-south-1"
const bucketName = "test-naac"
const accessKeyId = "AKIAUDPOT5JE3WCQNFJW"
const secretAccessKey = "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"

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const fileName = rawBytes.toString('hex')

  const params = ({
    Bucket:bucketName,
    Key: fileName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}