/// <reference types="@fastly/js-compute" />
import { CacheOverride } from "fastly:cache-override";
import { SecretStore } from "fastly:secret-store";

const backendName = "rt";
const serviceId = "myOKWFV3A3TGNBOXkU5kk2";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  // Get the request from the client.
  const req = event.request;
  
  // Parse the URL from client request.
  const url = new URL(req.url);
  const urlPathMatch = url.pathname.match(/\/ts\/(\d+)\/?$/);
  const qsMatch = url.searchParams.get("ts");
  let datetime;
  if (Number.parseInt(qsMatch)) {
    datetime = url.searchParams.get("ts");
  } else if (urlPathMatch) {
    datetime = urlPathMatch[1];
  } else {
    datetime = 0;
  }
  const newUrl = `https://rt.fastly.com/v1/channel/${serviceId}/ts/${datetime}`;
  console.log(newUrl);
  
  // Get api token from secret store
  const secrets = new SecretStore('tokens')
  const key = await secrets.get('haubles');

  // Create a cache override.
  let cacheOverride = new CacheOverride("override", { ttl: 60 });
  
  return fetch(newUrl, {
    backend: backendName,
    cacheOverride,
    headers: {
      "Fastly-Key": key.plaintext()
    }
  });
}



