import {defineMiddleware} from 'astro:middleware';

// This is state that lives across page transitions.
let score = 0;

export const onRequest = defineMiddleware((context, next) => {
  // console.log('middleware.ts onRequest: context =', context);
  console.log('middleware.ts onRequest: pathName =', context.url.pathname);
  const {locals} = context;

  // Intercept data from a request and optionally
  // modify properties in the`locals` object.
  score++;
  locals.score = score;
  locals.title = 'My Title';

  // Return a Response object or the result of calling `next`.
  return next();
});
