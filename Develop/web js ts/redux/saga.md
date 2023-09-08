- ### [Hello Sagas!​](https://redux-saga.js.org/docs/introduction/BeginnerTutorial/#hello-sagas)
In order to run our Saga, we need to:

==create a Saga middleware== with a list of Sagas to run (so far we have **only one helloSaga**)
connect the Saga middleware to ==the Redux store==

```js
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// ...
import { helloSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(helloSaga)

const action = type => store.dispatch({type})  
```

```ts
import { Action } from 'redux';
// store.dispatch Action
// Action 要有个 type 让saga知道要干嘛
/* 
export interface Action<T = any> {
  type: T
} 
*/
export const action = <Type = string, Payload = any>(type: Type, payload?: Payload) => store.dispatch({ type, payload })
export const fetchAsnyc = (fetcher?: any) => store.dispatch({ type:'FETCH_ASYNC', fetcher })
```

- ### Making Asynchronous calls
Next, we created another Saga watchIncrementAsync. We use takeEvery, a helper function provided by redux-saga, to listen for dispatched INCREMENT_ASYNC actions and run incrementAsync each time.

Now we have 2 Sagas, and we need to start them both at once. To do that, we'll add a rootSaga that is responsible for starting our other Sagas. In the same file sagas.js, refactor the file as follows:
```js
import { put, takeEvery, all } from 'redux-saga/effects'

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* helloSaga() {
  console.log('Hello Sagas!')
}

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}


export function* watchFetchAsnyc(){
  yield takeEvery('FETCH_ASYNC', function*(action){
    yield call(action.fetcher)
  })
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchFetchAsnyc()
  ])
}
```

```js
const getFooAsync = useCallback(function* () {
  yield call(getFoo, {name:'bar'}) // equal to getFoo({name:'bar'})
  yield put({ type: 'Foo' }) // put to reducer
}, [])
fetchAsnyc(getFooAsync)
```

`store.getState()`, [仅仅是示例！不要在实际的应用中这么做, 当 store state 变更时，组件不会自动更新](https://cn.react-redux.js.org/api/hooks/)
```jsx
const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
  <div>
    <button onClick={onIncrementAsync}>
      Increment after 1 second
    </button>
    {' '}
    <button onClick={onIncrement}>
      Increment
    </button>
    {' '}
    <button onClick={onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Clicked: {value} times
    </div>
  </div>

<Counter  
	value={store.getState()}  
	onIncrement={() => action('INCREMENT')}  // 直接到reducer
	onDecrement={() => action('DECREMENT')}  
	onIncrementAsync={() => action('INCREMENT_ASYNC', {fetcher, args})} // 先到saga
/>

const state = useSelector(state => state);

<Counter  
	value={state}  
	onIncrement={() => action('INCREMENT')}  
	onDecrement={() => action('DECREMENT')}  
	onIncrementAsync={() => action('INCREMENT_ASYNC')}
/>
```

测试reducer, 这里不用`INCREMENT_ASYNC`， 因为其会put INCREMENT.
```js
import { combineReducers } from 'redux'

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

const count = (state = {}, action) => {
  console.debug(action)
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: (state.value ?? 0) + 1 };
    case DECREMENT:
      return { ...state, value: (state.value ?? 0) - 1 };
    default:
      return state;
  }
}

const reducer = combineReducers({ count })

export default reducer
```