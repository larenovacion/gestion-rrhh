import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function loader(
    request: VercelRequest,
    response: VercelResponse
) {
    const authHeader = request.headers["authorization"];

    if (authHeader && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return response.status(401).end("Unauthorized");
    }
    return response.status(200).send("Hello Cron!");
}
