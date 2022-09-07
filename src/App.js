import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  Badge
} from '@mui/material'
import { initDatos } from './utils/tareas'
import TareasTabs from './TareasTabs'
import { getPendientes, getTerminadas } from './utils/tareas'
import Loading from './components/Loading'
import { useStoreState } from 'easy-peasy'

export default function App() {
  const { loading } = useStoreState(state => ({
    loading: state.loading
  }))
  const [counts, setCounts] = useState({
    pendientes: 0,
    terminadas: 0
  })
  const getCounts = async () => {
    const requests = [getPendientes(), getTerminadas()]
    const response = await Promise.all(requests)
    setCounts({
      pendientes: response[0].length,
      terminadas: response[1].length
    })
  }
  useEffect(() => {
    initDatos()
    getCounts()
  }, [])
  return <>
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Tareas
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Badge badgeContent={counts.pendientes} color="error">
              <span style={{fontSize: '1.5em'}}>⏳</span>
            </Badge>
            <Badge badgeContent={counts.terminadas} color="error">
              <span style={{fontSize: '1.5em'}}>✔️</span>
            </Badge>
        </Box>
      </Toolbar>
    </AppBar>
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <TareasTabs />
      </Box>
    </Container>
    <Loading open={loading} />
  </>
}
