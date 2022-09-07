import React, { useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton
} from '@mui/material'
import { cambiarEstado } from '../utils/tareas'
import { useStoreActions, useStoreState } from 'easy-peasy'

const Pendientes = ({ refresh }) => {
  const { pendientes } = useStoreState(state => ({
    pendientes: state.pendientes
  }))
  const { setLoading } = useStoreActions(actions => ({
    setLoading: actions.setLoading
  }))
  const marcarTerminada = async (index) => {
    setLoading(true)
    await cambiarEstado(index, 'terminada')
    refresh()
  }
  return <>
    <List>
      {
        pendientes.map((i, idx) => <ListItem key={idx} alignItems="flex-start">
          <ListItemAvatar>
            <IconButton onClick={() => marcarTerminada(i.index)}>✔️</IconButton>
          </ListItemAvatar>
          <ListItemText
            primary={i.tarea.toUpperCase()}
            secondary={ i.encargado }
          />
        </ListItem>)
      }
    </List>
  </>
}

export default Pendientes