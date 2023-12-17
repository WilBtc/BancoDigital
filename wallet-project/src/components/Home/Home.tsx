// Importing necessary dependencies
import * as React from 'react';
import { styled } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Internal import
import bancoDigitalImage from '../../assets/images/BancoDigital.png'; 
import { NavBar } from '../sharedComponents';

// Defining the component props
interface Props {
    title: string;
}

// Styling the components using MUI's styled utility
const Root = styled('div')({
    padding: 0,
    margin: 0
});

const Main = styled('main')({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(${bancoDigitalImage});`, // Update the image variable
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top 5px',
    position: 'absolute',
    marginTop: '10px'
});

const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
});

// Functional component for the home page
export const Home = (props: Props) => {
    // Return statement for the home component
    return (
        <Root>
            <NavBar />
            <Main>
                <MainText>
                    <Typography variant='h3'> {props.title} </Typography>
                    <Button sx={{ marginTop: '10px' }} component={Link} to={"/dashboard"} variant='contained'>
                        Explore BancoDigital
                    </Button>
                </MainText>
            </Main>
        </Root>
    );
};
