import React, { useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { useStoreState } from 'easy-peasy'

const Terminadas = () => {
  const { terminadas } = useStoreState(state => ({
    terminadas: state.terminadas
  }))
  return <>
    <List>
      {
        terminadas.map((i, idx) => <ListItem key={idx} alignItems="flex-start">
          <ListItemText
            primary={i.tarea.toUpperCase()}
            secondary={ i.encargado }
          />
        </ListItem>)
      }
    </List>
  </>
}

export default Terminadas