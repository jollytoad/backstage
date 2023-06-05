# AHX Addons for Backstage

Welcome to the addons plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/addons](http://localhost:3000/addons).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

## Configuration

The plugin makes use of the Backstage proxy, so you'll need to add some config into `app-config.yaml`:

```yaml
proxy:
  '/addons':
    target: http://127.0.0.1:8888/backstage
    allowedHeaders:
      - Origin
      - Access-Control-Expose-Headers
      - HX-Boosted
      - HX-Current-URL
      - HX-History-Restore-Request
      - HX-Prompt
      - HX-Request
      - HX-Target
      - HX-Trigger-Name
      - HX-Trigger
      - HX-Location
      - HX-Push-URL
      - HX-Redirect
      - HX-Refresh
      - HX-Replace-URL
      - HX-Reswap
      - HX-Retarget
      - HX-Trigger-After-Settle
      - HX-Trigger-After-Swap
      - AHX-Full-Page
    headers:
      User-Agent: Backstage
      AHX-Base-Req-URL: http://localhost:7007/api/proxy/addons
      AHX-Base-Nav-URL: http://localhost:3000/addons
```

And it requires a route, and some common `head` injected elements, in `packages/app/src/App.tsx`:

```ts
import { AddonsHead, AddonsPage } from '@backstage/plugin-addons';
```

add the route:

```tsx
const routes = (
  <FlatRoutes>
    ...
    <Route path="/addons" element={<AddonsPage />} />
  </FlatRoutes>
);
```

we also need some `head` content adding into every page of Backstage,
add `<AddonsHead/>` before the `<AppRouter>` ...

```tsx
export default app.createRoot(
  ...
    <AddonsHead/>
    <AppRouter>
  ...
```
