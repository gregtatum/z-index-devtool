import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
const loggerMiddleware = logger({ logErrors: false });
import reducers from "./reducers";

export default function getStore() {
  return createStore(
    reducers,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}
