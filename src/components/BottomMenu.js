import * as React from 'react'
import Paper from '@mui/material/Paper'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import AddIcon from '@mui/icons-material/Add'
import ForumIcon from '@mui/icons-material/Forum'

const BottomMenu = () => {
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

            <BottomNavigation showLabels > 
            <BottomNavigationAction label="Add Event" icon={<AddIcon />} />
            <BottomNavigationAction label="Messages" icon={<ForumIcon />} />
            </BottomNavigation>
        </Paper>
    );
}

export default BottomMenu