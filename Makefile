bundle:
	echo '// homepage: https://github.com:shynome/deno-http-call.git' > package/usr/lib/deno-http-call/http-call.js
	deno bundle main.ts >> package/usr/lib/deno-http-call/http-call.js
deb:
	dpkg -b package deno-http-call.deb
