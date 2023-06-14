import axios, { AxiosResponse } from "axios";
import { User } from "../../types/user";

export interface OAuthAccessToken {
	access_token: string;
	refresh_token: string;
	expires_in: number;
}

export class OsuApi {
	public readonly code: string;
	private access_token!: string;

	constructor(code: string) {
		this.code = code;
	}

	async validateCode() {
		const token = (await axios("https://osu.ppy.sh/oauth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				client_id: process.env.OSU_CLIENT_ID,
				client_secret: process.env.OSU_CLIENT_SECRET,
				code: this.code,
				grant_type: "authorization_code",
				redirect_uri: process.env.OSU_CALLBACK_URL,
			}),
		})) as AxiosResponse<OAuthAccessToken>;

		this.access_token = token.data.access_token;

		return true;
	}

	async fetchMe() {
		const user = (await axios("https://osu.ppy.sh/api/v2/me", {
			headers: {
				Authorization: `Bearer ${this.access_token}`,
			},
		})) as AxiosResponse<User>;

		return user;
	}
}
