import * as React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Stack,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getDatabase, ref, push } from 'firebase/database';

// Internal imports
import { useGetShop, ShopProps } from '../../customHooks';
import { NavBar, InputText } from '../sharedComponents';
import { theme } from '../../Theme/themes';
import { MessageType } from '../Auth';

export const shopStyles = {
    main: {
        backgroundColor: 'white', // Set the background color to white
        height: '100%',
        width: '100%',
        color: theme.palette.primary.dark, // Set the text color to dark blue
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'absolute',
        overflow: 'auto',
        paddingBottom: '100px',
    },
    grid: {
        marginTop: '25px',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '70vw',
    },
    card: {
        width: '300px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.light, // Set the card background color to light blue
        border: '2px solid',
        borderColor: theme.palette.secondary.dark, // Set the border color to dark blue
        borderRadius: '10px',
    },
    cardMedia: {
        width: '95%',
        margin: 'auto',
        marginTop: '5px',
        aspectRatio: '1/1',
        border: '1px solid',
        borderColor: theme.palette.secondary.dark, // Set the border color to dark blue
        borderRadius: '10px',
    },
    button: {
        color: 'white',
        borderRadius: '50px',
        height: '45px',
        width: '250px',
        marginTop: '10px',
        backgroundColor: theme.palette.secondary.dark, // Set the button background color to dark blue
        '&:hover': {
            backgroundColor: theme.palette.secondary.main, // Set the button background color to light blue on hover
        },
    },
    stack: {
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    stack2: {
        border: '1px solid',
        borderColor: theme.palette.secondary.dark, // Set the border color to dark blue
        borderRadius: '50px',
        width: '100%',
        marginTop: '10px',
    },
    typography: {
        marginLeft: '15vw',
        color: theme.palette.primary.dark, // Set the text color to dark blue
        marginTop: '100px',
    },
};

export interface SubmitProps {
    quantity: string;
}

interface CartProps {
    cartItem: ShopProps;
}

const AddToCart = ({ cartItem }: CartProps) => {
    const db = getDatabase();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState<string>();
    const [messageType, setMessageType] = React.useState<MessageType>();
    const { register, handleSubmit } = useForm<SubmitProps>();

    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault();

        const userId = localStorage.getItem('uuid');
        const cartRef = ref(db, `carts/${userId}/`);

        if (cartItem.quantity > parseInt(data.quantity)) {
            cartItem.quantity = parseInt(data.quantity);
        }

        push(cartRef, cartItem)
            .then((_newCartRef) => {
                setMessage(`Successfully added item ${cartItem.name} to Cart`);
                setMessageType('success');
                setOpen(true);
            })
            .then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((error) => {
                setMessage(error.message);
                setMessageType('error');
                setOpen(true);
            });
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <label htmlFor="quantity">How much of {cartItem.name} do you want to add?</label>
                    <InputText {...register('quantity')} name="quantity" placeholder="Quantity Here" />
                </Box>
                <Button type="submit">Submit</Button>
            </form>
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert severity={messageType}>{message}</Alert>
            </Snackbar>
        </Box>
    );
};

export const Shop = () => {
    const { shopData } = useGetShop();
    const [currentShop, setCurrentShop] = React.useState<ShopProps>();
    const [cartOpen, setCartOpen] = React.useState(false);

    console.log(shopData);

    return (
        <Box sx={shopStyles.main}>
            <NavBar />
            <Typography variant="h4" sx={shopStyles.typography}>
                The Shop
            </Typography>
            <Grid container spacing={3} sx={shopStyles.grid}>
                {shopData.map((shop: ShopProps, index: number) => (
                    <Grid item key={index} xs={12} md={6} lg={4}>
                        <Card sx={shopStyles.card}>
                            <CardMedia
                                component="img"
                                sx={shopStyles.cardMedia}
                                image={shop.image}
                                alt={shop.name}
                            />
                            <CardContent>
                                <Stack
                                    direction="column"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Button
                                            size="medium"
                                            variant="outlined"
                                            sx={shopStyles.button}
                                            onClick={() => {
                                                setCurrentShop(shop);
                                                setCartOpen(true);
                                            }}
                                        >
                                            Add to Cart - ${parseFloat(shop.price).toFixed(2)}
                                        </Button>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={cartOpen} onClose={() => setCartOpen(false)}>
                <DialogContent>
                    <DialogContentText>Add to Cart</DialogContentText>
                    <AddToCart cartItem={currentShop as ShopProps} />
                </DialogContent>
            </Dialog>
        </Box>
    );
};
