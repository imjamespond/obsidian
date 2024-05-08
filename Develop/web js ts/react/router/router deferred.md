https://reactrouter.com/en/main/guides/deferred#using-defer
通过route里的loader载入业务数据

React Router takes advantage of React 18's Suspense for data fetching using the [`defer` Response](https://reactrouter.com/en/main/utils/defer) utility and [`<Await />`](https://reactrouter.com/en/main/components/await) component / [`useAsyncValue`](https://reactrouter.com/en/main/hooks/use-async-value) hook. By using these APIs, you can solve both of these problems:

1. Your data is no longer on a waterfall: document -> JavaScript -> Lazy Loaded Route & data (in parallel)
2. Your code can easily switch between rendering the fallback and waiting for the data

Let's take a dive into how to accomplish this.

- ##### [Using `defer`](https://reactrouter.com/en/main/guides/deferred#using-defer)

Start by adding `<Await />` for your slow data requests ==where you'd rather render a fallback UI.== Let's do that for our example above:

```tsx
import {
  Await,
  defer,
  useLoaderData,
} from "react-router-dom";
import { getPackageLocation } from "./api/packages";

async function loader({ params }) {
  const packageLocationPromise = getPackageLocation(
    params.packageId
  );

  return defer({
    packageLocation: packageLocationPromise,
  });
}

export default function PackageRoute() {
  const data = useLoaderData();

  return (
    <main>
      <h1>Let's locate your package</h1>
      <React.Suspense
        fallback={<p>Loading package location...</p>}
      >
        <Await
          resolve={data.packageLocation}
          errorElement={
            <p>Error loading package location!</p>
          }
        >
          {(packageLocation) => (
            <p>
              Your package is at {packageLocation.latitude}{" "}
              lat and {packageLocation.longitude} long.
            </p>
          )}
        </Await>
      </React.Suspense>
    </main>
  );
}
```

- #### Alternatively, you can use the `useAsyncValue` hook:
If you're not jazzed about bringing back render props, you can use a hook, but you'll have to break things out into another component:

```tsx
export default function PackageRoute() {
  const data = useLoaderData();

  return (
    <main>
      <h1>Let's locate your package</h1>
      <React.Suspense
        fallback={<p>Loading package location...</p>}
      >
        <Await
          resolve={data.packageLocation}
          errorElement={
            <p>Error loading package location!</p>
          }
        >
          <PackageLocation />
        </Await>
      </React.Suspense>
    </main>
  );
}

function PackageLocation() {
  const packageLocation = useAsyncValue();
  return (
    <p>
      Your package is at {packageLocation.latitude} lat and{" "}
      {packageLocation.longitude} long.
    </p>
  );
}
```

- #### [Evaluating the solution](https://reactrouter.com/en/main/guides/deferred#evaluating-the-solution)

So rather than waiting for the component before we can trigger the fetch request, we start the request for the slow data as soon as the user starts the transition to the new route. This can significantly speed up the user experience for slower networks.

Additionally, the API that React Router exposes for this is extremely ergonomic. You can literally switch between whether something is going to be deferred or not based on whether you include the `await` keyword:

```
return defer({
  // not deferred:
  packageLocation: await packageLocationPromise,
  // deferred:
  packageLocation: packageLocationPromise,
});
```

Because of this, you can A/B test deferring, or even determine whether to defer based on the user or data being requested:

```
async function loader({ request, params }) {
  const packageLocationPromise = getPackageLocation(
    params.packageId
  );
  const shouldDefer = shouldDeferPackageLocation(
    request,
    params.packageId
  );

  return defer({
    packageLocation: shouldDefer
      ? packageLocationPromise
      : await packageLocationPromise,
  });
}
```

That `shouldDeferPackageLocation` could be implemented to check the user making the request, whether the package location data is in a cache, the status of an A/B test, or whatever else you want. This is pretty sweet 🍭