import { action } from "easy-peasy"

const tareasStore = {
  pendientes: [],
  terminadas: [],
  setPendientes: action((state, payload) => {
    state.pendientes = payload
  }),
  setTerminadas: action((state, payload) => {
    state.terminadas = payload
  })
}

export default tareasStore
