import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	return res
		.status(200)
		.send(
			`https://osu.ppy.sh/oauth/authorize?client_id=${process.env.OSU_CLIENT_ID}&redirect_uri=${process.env.OSU_CALLBACK_URL}&response_type=code&scope=public`
		);
}
