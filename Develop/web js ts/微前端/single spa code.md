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

// 根应用
if (process.env.NODE_ENV === 'development') {
  System.addImportMap({
    "imports": {
      "react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
      "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js",
      "antd": "https://cdn.jsdelivr.net/npm/antd@4.20.7/dist/antd.min.js",
      "moment": "https://cdn.jsdelivr.net/npm/moment@2.29.2/moment.min.js"
    }
  })
}

// 子应用create-single-spa webpack，standalone开发时不排除，打包时有根应用提供全局库
const cfg = merge(defaultConfig, {
  externals: webpackConfigEnv.standalone ? [] : ['antd']
});
// 子应用导出update，主应用才能update 属性
export const { bootstrap, mount, unmount, update } = lifecycles;
```