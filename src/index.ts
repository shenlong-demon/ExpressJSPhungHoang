/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { TestRepo } from './TestRepo';
import { Env } from '../worker-configuration';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const all = await TestRepo.get(env.DB);
		// const { results } = await env.DB.prepare(
		// 	"SELECT * FROM d1_migrations"
		// )
		// 	.all();
		return Response.json(all);
	},
} satisfies ExportedHandler<Env>;
