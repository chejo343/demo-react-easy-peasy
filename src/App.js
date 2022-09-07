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
import Loading from './components/Loading'
import { useStoreState } from 'easy-peasy'

export default function App() {
  const { loading, terminadas, pendientes } = useStoreState(state => ({
    loading: state.loading,
    terminadas: state.terminadas,
    pendientes: state.pendientes
  }))
  useEffect(() => {
    initDatos()
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
            <Badge badgeContent={pendientes.length} color="error">
              <span style={{fontSize: '1.5em'}}>⏳</span>
            </Badge>
            <Badge badgeContent={terminadas.length} color="error">
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
