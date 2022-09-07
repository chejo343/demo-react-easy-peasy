import React, { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Tabs,
  Tab
} from '@mui/material'
import Terminadas from './components/Terminadas'
import Pendientes from './components/Pendientes'
import { getPendientes, getTerminadas } from './utils/tareas'
import { useStoreActions, useStoreState } from 'easy-peasy'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const TareasTabs = () => {
  const { pendientes, terminadas } = useStoreState(state => ({
    pendientes: state.pendientes,
    terminadas: state.terminadas
  }))
  const { setPendientes, setTerminadas, setLoading } = useStoreActions(actions => ({
    setPendientes: actions.setPendientes,
    setTerminadas: actions.setTerminadas,
    setLoading: actions.setLoading
  }))
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const getTareas = async () => {
    try {
      setLoading(true)
      const requests = [getPendientes(), getTerminadas()]
      const responses = await Promise.all(requests)
      setPendientes(responses[0])
      setTerminadas(responses[1])
      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getTareas()
  }, [])
  return <>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label={`Pendientes (${pendientes.length})`} {...a11yProps(0)} />
        <Tab label={`Terminadas (${terminadas.length})`} {...a11yProps(1)} />
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      <Pendientes refresh={getTareas} />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <Terminadas refresh={getTareas} />
    </TabPanel>
  </>
}

export default TareasTabs
