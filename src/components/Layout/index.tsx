import { ReactNode, FC } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Box } from '@mui/material'
import theme from '@/pages/theme'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type Props = {
  children: ReactNode
}

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: theme.palette.grey[100],
  },
  container: {
    display: 'flex',
    flex: ' 1 1 auto',
    overflow: 'hidden',
    paddingTop: '64px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '200px',
    },
  },
  content: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  childrenBox: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={styles.wrapper}>
        <Navbar />
        <Sidebar />
        <Box sx={styles.container}>
          <Box sx={styles.content}>
            <Box sx={styles.childrenBox}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  )
}
