import tareasStore from "./tareasStore";
import { action } from "easy-peasy";

export default {
  loading: false,
  setLoading: action((state, payload) => {
    state.loading = payload
  }),
  ...tareasStore
}