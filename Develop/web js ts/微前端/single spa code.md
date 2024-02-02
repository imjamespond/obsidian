[Parcel](https://single-spa.js.org/docs/ecosystem-react#parcels)
```tsx
import React, { useMemo, useRef } from 'react';
// import 'systemjs'
import Parcel from 'single-spa-react/parcel'

function FC<T = {}>({ app, name, props }: { app: string, name?: string, props: T }) {

  const ref = useRef(null)

  const parcel = useMemo(() => {
    return <Parcel
      config={new Promise((rsov) => {
        System.import(app).then((parcelConfig: any) => {
          rsov({ ...parcelConfig, name: name || parcelConfig.name })
        })
      })}
      handleError={err => console.error(err)}
      appendTo={ref.current}
      {...props}
    />
  }, [props])

  return (
    <div className='foo' ref={ref}>
      {parcel}
    </div>
  )
}

export default FC

...

<Parcel app="km-spa-app" name="foo" props={{ foo: count }} />

...


System.addImportMap({
  "imports": {
    "km-spa-app": "//localhost:5501/km-spa-app.js",
  }
})

if (process.env.NODE_ENV === 'development') {
  System.addImportMap({
    "imports": {
      "react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
      "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"
    }
  })
}

```