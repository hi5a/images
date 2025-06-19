/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request) {
		//console.log(request)
		function getQueryPram(key){
			if (request.url.includes("?")){
				const query = request.url.split("?");
				const queries = query[1].split('&');
				queries.forEach(q => {
					const kv = q.split('=');
					if (kv[0] == key){
						return kv[1]
					}
				});
			}else{
				return null;
			}
		}
		if (request.url.includes("/img/social/")){
			let dir = "/img/social/"
			const dark = await getQueryPram('dark')
			if (dark == 'true'){
				dir = dir + "dark/"
			} else{
				dir = dir + "light/"
			}
			const fileQ = request.url.split('/social/');
			const file = dir + fileQ[1].split("?")[0];
			const url = "https://cdn.aball.dev" + file;
			return await fetch(url)
		}
		const newResponse = new Response()
		return newResponse;
	},
  };
