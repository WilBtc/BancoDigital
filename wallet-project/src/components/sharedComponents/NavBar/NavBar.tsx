import * as React from 'react';
import { useState } from 'react'; //useState is a React Hook
import {
    Button,
    Drawer,
    ListItemButton,
    List,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Stack, //flexbox
    Typography,
    Divider, //this is literally just a line
    CssBaseline,
    Box //this is just a div 
} from '@mui/material'; 
import { useNavigate } from 'react-router-dom'; 
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signOut, getAuth } from 'firebase/auth'; 

//internal imports
import { theme } from '../../../Theme/themes'; 

// building a CSS object/dictionary to reference inside our html for styling
const drawerWidth = 200; 

const navStyles = {
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp, //number 
            duration: theme.transitions.duration.leavingScreen //string calculation of the duration
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut, //number 
            duration: theme.transitions.duration.enteringScreen //string calculation of the duration
        })
    },
    menuButton: {
        marginRight: theme.spacing(2) //default to 8px * 2 = 16px
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        width: drawerWidth,
        alignItems: 'center',
        padding: theme.spacing(1),
        // using the spread operator ... to grab all the properties from the default toolbar in theme
        ...theme.mixins.toolbar, 
        justifyContent: 'flex-end'
    },
    toolbar: {
        display: 'flex'
    },
    toolbarButton: {
        marginLeft: 'auto',
        color: theme.palette.primary.contrastText
    },
    signInStack: {
        position: 'absolute',
        top: '20%',
        right: '50px'
    }
};

export const NavBar = () => {
    // setup all your hooks & variables
    const [open, setOpen] = useState(false); //setting initial state to false as in NOT open
    const navigate = useNavigate(); 
    // grabbing our auth boolean whether or not someone is signed in
    const myAuth = localStorage.getItem('auth');
    const auth = getAuth(); 

    // 2 functions to help us set our hook
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // list of dictionary/object for our NavLinks
    const navLinks = [
        {
            text: 'Home',
            icon: <HomeIcon />,
            onClick: () => navigate('/')
        },
        {
            text: myAuth === 'true' ? 'Account' : 'Sign In',
            icon: myAuth === 'true' ? <AccountBalanceIcon /> : <ExitToAppIcon />,
            onClick: () => navigate(myAuth === 'true' ? '/account' : '/auth')
        },
        {
            text: myAuth === 'true' ? 'Cart' : '',
            icon: <ShoppingCartIcon />,
            onClick: myAuth === 'true' ? () => navigate('/cart') : () => {}
        }
    ];

    let signInText = 'Sign In';

    if (myAuth === 'true') {
        signInText = 'Sign Out';
    }

    const signInButton = async () => {
        if (myAuth === 'false') {
            navigate('/auth');
        } else {
            await signOut(auth);
            localStorage.setItem('auth', 'false');
            localStorage.setItem('user', '');
            localStorage.setItem('uuid', '');
            navigate('/');
        }
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <AppBar 
                sx={ open ? navStyles.appBarShift : navStyles.appBar }
                position='fixed'
            >
                <Toolbar sx={ navStyles.toolbar }>
                    <IconButton 
                        color='inherit'
                        aria-label='open drawer'
                        onClick={ handleDrawerOpen }
                        edge='start'
                        sx={ open ? navStyles.hide : navStyles.menuButton }
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                </Toolbar>
                <Stack 
                    direction='row' 
                    justifyContent='space-between' 
                    alignItems='center'
                    sx={ navStyles.signInStack } >
                    <Typography variant='body2' sx={{color: 'inherit'}}>
                        Cool User
                    </Typography>
                    <Button 
                        variant='contained'
                        color='info'
                        size='large'
                        sx={{ marginLeft: '20px'}}
                        onClick={ signInButton }
                    >
                        { signInText }
                    </Button>
                </Stack>
            </AppBar>
            <Drawer
                sx={ open ? navStyles.drawer : navStyles.hide }
                variant='persistent'
                anchor='left' 
                open={open} //either true or false 
            >
                <Box sx={navStyles.drawerHeader }>
                    <IconButton onClick={handleDrawerClose}>
                        <ShoppingCartIcon />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    { navLinks.map((item) => {
                        // using variable deconstruction to deconstruct our object/dictionary
                        const { text, icon, onClick } = item; 
                        return (
                            <ListItemButton key={text} onClick={onClick}>
                                <ListItemText primary={text} />
                                { icon }
                            </ListItemButton>
                        )
                    })}
                </List>
            </Drawer>
        </Box>
    );
};
