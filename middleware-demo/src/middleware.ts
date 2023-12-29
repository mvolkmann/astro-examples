import {defineMiddleware} from 'astro:middleware';

// This is state that lives across page transitions.
let score = 0;

const securePaths = ['/secret'];

export const onRequest = defineMiddleware(async (context, next) => {
  score++;

  // Optionally set properties in the `locals` object
  // that all pages can access with `Astro.locals`.
  const {locals, url} = context;
  locals.score = score;
  locals.title = 'My Title';

  const response = await next();

  if (securePaths.includes(url.pathname)) {
    const {headers} = response;

    // Consider using this to return different responses based on the value.
    const contentType = headers.get('content-type');
    console.log('middleware.ts : contentType =', contentType);

    // Check for authentication.
    const authorization = headers.get('Authorization');
    if (!authorization) {
      return new Response('Unauthorized', {
        status: 401,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'WWW-Authenticate': 'Basic realm="Secure Area"'
        }
      });
    }
  }

  /*
  // Optionally modify the HTML being returned.
  const html = await response.text();
  console.log('middleware.ts : html =', html);
  const modifiedHtml = html; // make some change
  return new Response(modifiedHtml, {
    headers: response.headers,
    status: 200
  });
  */

  return response;
});
