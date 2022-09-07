import tareasStore from "./tareasStore";
import { action, createStore } from "easy-peasy";

const store =  {
  loading: false,
  setLoading: action((state, payload) => {
    state.loading = payload
  }),
  ...tareasStore
}

export default createStore(store)