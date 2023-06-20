import * as React from 'react'
import theme from '@/pages/theme'
import {
  PeopleAlt,
  AirlineSeatReclineNormal,
  ForkRight,
  DirectionsCarFilled,
} from '@mui/icons-material'
import {
  Box,
  Hidden,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconProps,
} from '@mui/material'
import { useRouter } from 'next/router'

interface MenuItensProps {
  id: number
  label: string
  path: string
  icon: IconProps
}

const styles = {
  mobileDrawer: {
    width: '240px',
  },
  desktopDrawer: {
    width: '240px',
    top: '56px',
    heigth: 'calc(100% - 64px)',
    borderRigth: 'none',
  },
  listItem: {
    paddingTop: '6px',
    paddingBottom: '6px',
    peddingLeft: theme.spacing(3),
  },
  listItemtext: {
    fontSize: '14px',
  },
}

const menuItens: MenuItensProps[] = [
  { id: 1, label: 'Clientes', path: '/client', icon: PeopleAlt },
  {
    id: 2,
    label: 'Condutores',
    path: '/conductor',
    icon: AirlineSeatReclineNormal,
  },
  { id: 3, label: 'Deslocamentos', path: '/displacement', icon: ForkRight },
  { id: 4, label: 'Veículos', path: '/vehicle', icon: DirectionsCarFilled },
]

export default function Sidebar() {
  const router = useRouter()
  const isSelected = (item: MenuItensProps) => {
    return router.pathname === item.path
  }

  const content = (
    <Box height="100%" display="flex" flexDirection="column" paddingTop={7}>
      <List>
        {menuItens.map((item) => {
          const Icon = item.icon

          return (
            <ListItemButton
              key={item.id}
              classes={{ root: `${styles.listItem}` }}
              selected={isSelected(item)}
            >
              <ListItemIcon>
                <Icon style={{ color: isSelected(item) && '#4caf50' }} />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: `${styles.listItemtext}` }}
                primary={item.label}
              />
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Hidden mdDown>
      <Drawer
        anchor="left"
        classes={{ paper: `${styles.desktopDrawer}` }}
        open
        variant="persistent"
      >
        {content}
      </Drawer>
    </Hidden>
  )
}
