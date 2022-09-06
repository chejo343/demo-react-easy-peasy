import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { getTerminadas } from '../utils/tareas'
import Loading from './Loading'

const Terminadas = () => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const getItems = async () => {
    try {
      setLoading(true)
      const data = await getTerminadas()
      setItems(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getItems()
  }, [])
  return <>
    <List>
      {
        items.map((i, idx) => <ListItem key={idx} alignItems="flex-start">
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

export default Terminadas