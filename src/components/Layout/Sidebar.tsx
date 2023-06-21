import * as React from 'react'
import theme from '@/pages/theme'
import {
  PeopleAlt,
  AirlineSeatReclineNormal,
  ForkRight,
  DirectionsCarFilled,
  SvgIconComponent,
} from '@mui/icons-material'
import {
  Box,
  Hidden,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useRouter } from 'next/router'

interface IMenuItens {
  id: number
  label: string
  path: string
  icon: SvgIconComponent
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

const menuItens: IMenuItens[] = [
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

  const isSelected = (item: IMenuItens) => {
    return router.pathname === item.path
  }

  const content = (
    <Box height="100%" display="flex" flexDirection="column" paddingTop={7}>
      <List>
        {menuItens.map((item: IMenuItens) => {
          const Icon = item.icon

          return (
            <ListItemButton
              key={item.id}
              classes={{ root: `${styles.listItem}` }}
              selected={isSelected(item)}
              onClick={() => router.push(item.path)}
            >
              <ListItemIcon>
                <Icon
                  style={{ color: isSelected(item) ? '#4caf50' : undefined }}
                />
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
