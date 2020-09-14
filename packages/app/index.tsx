import "react-native-gesture-handler";
import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer, rootSaga } from "@reddit-clone/controller";
import App from "./src/App";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const MainApp = () => {
  return (
    <Provider store={store}>
      <AppearanceProvider>
        <App />
      </AppearanceProvider>
    </Provider>
  );
};

export default MainApp;
