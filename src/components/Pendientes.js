import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton
} from '@mui/material'
import { getPendientes, cambiarEstado } from '../utils/tareas'
import Loading from './Loading'

const Pendientes = () => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const getItems = async () => {
    try {
      setLoading(true)
      const data = await getPendientes()
      setItems(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const marcarTerminada = async (index) => {
    setLoading(true)
    await cambiarEstado(index, 'terminada')
    await getItems()
  }
  useEffect(() => {
    getItems()
  }, [])
  return <>
    <List>
      {
        items.map((i, idx) => <ListItem key={idx} alignItems="flex-start">
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
    <Loading open={loading} />
  </>
}

export default Pendientes