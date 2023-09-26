import { NextResponse } from "next/server"
import aws from "aws-sdk"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get("filename")
  try {
    const s3 = new aws.S3({
      accessKeyId: process.env.APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.APP_AWS_SECRET_KEY,
      region: process.env.APP_AWS_REGION,
    })

    aws.config.update({
      accessKeyId: process.env.APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.APP_AWS_SECRET_KEY,
      region: process.env.APP_AWS_REGION,
      signatureVersion: "v4",
    })

    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000)
    const post = await s3.createPresignedPost({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Fields: {
        key: `experiments/${currentTimeInSeconds}-${filename}`,
      },
      Expires: 60, // seconds
      Conditions: [
        ["content-length-range", 0, 15485760], // up to 1 MB
      ],
    })

    const response = { post: post, timestamp: currentTimeInSeconds }

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "2mb", // Set desired value here
//     },
//   },
// }
