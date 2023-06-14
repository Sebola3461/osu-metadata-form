import { NextApiRequest, NextApiResponse } from "next";
import { OsuApi } from "../../helpers/OsuApi";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const code = req.query.code;

	if (!code || typeof code != "string")
		return res.send("Invalid code provided!");

	const osuApi = new OsuApi(code);
	await osuApi.validateCode();

	const userInfo = await osuApi.fetchMe();

	if (userInfo.status != 200) return res.send(userInfo.statusText);

	const formURL = new URL(process.env.FORM_URL);

	formURL.searchParams.set(
		`entry.${process.env.FORM_USERNAME_FIELD}`,
		userInfo.data.username
	);

	formURL.searchParams.set(
		`entry.${process.env.FORM_USER_ID_FIELD}`,
		userInfo.data.id.toString()
	);

	return res.redirect(formURL.href);
}
