bundle:
	echo '// homepage: https://github.com:shynome/deno-http-call.git' > package/usr/lib/deno-http-call/http-call.js
	deno bundle main.ts >> package/usr/lib/deno-http-call/http-call.js
deb:
	make bundle
	dpkg -b package deno-http-call.deb
module-cache:
	deno cache --lock=lock.json main.ts
lock-file:
	deno cache --lock=lock.json --lock-write main.ts
