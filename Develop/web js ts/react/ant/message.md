message全局使用会弹warn，所以用hook
```ts
export type AppContextType = { [key: string]: any, msg: ReturnType<typeof message.useMessage>[0] }
export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useMsg() {
  const app = useContext(AppContext)
  return app?.msg!
}
```

App中
```tsx
const [msg, msgContext] = message.useMessage()
    <div className="App">
      <AppContext.Provider value={{ msg }}>
        {msgContext}
        {...routes}
      </AppContext.Provider>
    </div>
```