import History from '@/components/league/tabs/History'
import PlayerStats from '@/components/league/tabs/PlayerStats'
import TeamsStats from '@/components/league/tabs/TeamsStats'
import { useLeague } from '@/hooks/useLeague'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import React from 'react'
import { MdExpandMore } from 'react-icons/md'

const Stats = ({ id }) => {


  const style = { backgroundColor: "rgb(14,62,29)", color: "white" }
  const style2 = { backgroundColor: "rgb(14,32,29)", color: "white" }

  return (
    <Fade in={true} timeout={300}>
      <div class={"md:p-2 p-0"}>


        <Accordion  slotProps={{ transition: { timeout: 0 } }} style={style}>
          <AccordionSummary expandIcon={<MdExpandMore color={"#ffff"} size={20} />}>Estadísticas de Jugadores</AccordionSummary>
          <AccordionDetails style={style2}>
            <PlayerStats id={id} />
          </AccordionDetails>
        </Accordion>

        <Accordion  slotProps={{ transition: { timeout: 0 } }} style={style}>
          <AccordionSummary expandIcon={<MdExpandMore color={"#ffff"} size={20} />}>Estadísticas de Equipos</AccordionSummary>
          <AccordionDetails style={style2}>
            <TeamsStats id={id} />
          </AccordionDetails>
        </Accordion>

        <Accordion  slotProps={{ transition: { timeout: 0 } }} style={style}>
          <AccordionSummary expandIcon={<MdExpandMore color={"#ffff"} size={20} />}>Historial del torneo</AccordionSummary>
          <AccordionDetails style={style2}>
            <History id={id} />
          </AccordionDetails>
        </Accordion>

      </div>
    </Fade>
  )
}

export default Stats