import { tareas } from './data'

export const getPendientes = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('Obtener tareas pendientes')
      const items = JSON.parse(sessionStorage.getItem('tareas'))
      return res(items.filter(i => i.estado === 'pendiente'))
    }, 3000);
  })
}
export const getTerminadas = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('Obtener tareas terminadas')
      const items = JSON.parse(sessionStorage.getItem('tareas'))
      return res(items.filter(i => i.estado === 'terminada'))
    }, 2000);
  })
}
export const cambiarEstado = (index, estado) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const items = JSON.parse(sessionStorage.getItem('tareas'))
      const idx = items.findIndex(i => i.index === index)
      items[idx].estado = estado
      sessionStorage.setItem('tareas', JSON.stringify(items))
      return res()
    }, 3000);
  })
}

export const initDatos = () => {
  sessionStorage.setItem('tareas', JSON.stringify(tareas))
}