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
  const [value, setValue] = useState(0)
  const [labels, setLabels] = useState({
    pendientes: 'Pendientes',
    terminadas: 'Terminadas'
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const getLabels = async () => {
    const requests = [getPendientes(), getTerminadas()]
    const response = await Promise.all(requests)
    setLabels({
      pendientes: `Pendientes (${response[0].length})`,
      terminadas: `Terminadas (${response[1].length})`,
    })
  }
  useEffect(() => {
    getLabels()
  }, [])
  return <>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label={labels.pendientes} {...a11yProps(0)} />
        <Tab label={labels.terminadas} {...a11yProps(1)} />
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      <Pendientes />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <Terminadas />
    </TabPanel>
  </>
}

export default TareasTabs
