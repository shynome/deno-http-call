bundle:
	echo '// homepage: https://github.com:shynome/deno-http-call.git' > http-call.js
	deno bundle main.ts >> http-call.js
