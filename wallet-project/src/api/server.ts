// const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMTg4MjIzNCwianRpIjoiZDA1YzVjYjktZGQyMi00YmI2LWEwOTMtNzFmYzE0MDZmYzJmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFsZXhzd2lnZ3VtIiwibmJmIjoxNzAxODgyMjM0LCJleHAiOjE3MzM0MTgyMzR9.R55gQvhggIWnU70-a8PYhmfvx5CE4yYHgLiYaa2ofFw"
// const userId = localStorage.getItem('uuid') //grabbing the uuid from Google Authentication 



// // putting all our API calls in a giant dictionary/object

// export const serverCalls = {

//     getShop: async () => {
//         // api call consist of 1-4 things 
//         // 1. url (required)
//         // 2. method (optional it will default to GET)
//         // 3. headers (optional but usually there) authentication type & type of data 
//         // 4. body (optional usually only on a POST, PUT and sometimes DELETE)
//         const response = await fetch(`https://rangers134-shopas.onrender.com/api/shop`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${accessToken}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data'), response.status 
//         }

//         return await response.json()

//     },
//     getOrder: async () => {
//         // api call consist of 1-4 things 
//         // 1. url (required)
//         // 2. method (optional it will default to GET)
//         // 3. headers (optional but usually there) authentication type & type of data 
//         // 4. body (optional usually only on a POST, PUT and sometimes DELETE)
//         const response = await fetch(`https://rangers134-shopas.onrender.com/api/order/${userId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${accessToken}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data'), response.status 
//         }

//         return await response.json()

//     },
//     createOrder: async (data: unknown) => { //come back to change any 
//         // api call consist of 1-4 things 
//         // 1. url (required)
//         // 2. method (optional it will default to GET)
//         // 3. headers (optional but usually there) authentication type & type of data 
//         // 4. body (optional usually only on a POST, PUT and sometimes DELETE)
//         const response = await fetch(`https://rangers134-shopas.onrender.com/api/order/create/${userId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${accessToken}`
//             },
//             body: JSON.stringify(data) //sending a string of our dictionary to our server 
//         });

//         if (!response.ok) {
//             throw new Error('Failed to create data'), response.status 
//         }

//         return await response.json()

//     },
//     updateData: async (orderId: string, data: unknown) => { //change this from any 
//         // api call consist of 1-4 things 
//         // 1. url (required)
//         // 2. method (optional it will default to GET)
//         // 3. headers (optional but usually there) authentication type & type of data 
//         // 4. body (optional usually only on a POST, PUT and sometimes DELETE)
//         const response = await fetch(`https://rangers134-shopas.onrender.com/api/order/update/${orderId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${accessToken}`
//             },
//             body: JSON.stringify(data) 
//         });

//         if (!response.ok) {
//             throw new Error('Failed to update data'), response.status 
//         }

//         return await response.json()

//     },
//     deleteOrder: async (orderId: string, data: unknown) => {
//         // api call consist of 1-4 things 
//         // 1. url (required)
//         // 2. method (optional it will default to GET)
//         // 3. headers (optional but usually there) authentication type & type of data 
//         // 4. body (optional usually only on a POST, PUT and sometimes DELETE)
//         const response = await fetch(`https://rangers134-shopas.onrender.com/api/order/delete/${orderId}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${accessToken}`
//             },
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) {
//             throw new Error('Failed to delete data'), response.status 
//         }

//         return await response.json()

//     }
// }

const accessToken = "your_access_token_here"; // Replace with your actual access token
const userId = localStorage.getItem('uuid');

export const serverCalls = {
    getShop: async () => {
        const response = await fetch(`http://localhost:5000/api/shop`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        return await response.json();
    },
    getOrder: async () => {
        const response = await fetch(`http://localhost:5000/api/order/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        return await response.json();
    },
    createOrder: async (data: unknown) => {
        const response = await fetch(`http://localhost:5000/api/order/create/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Failed to create data: ${response.status}`);
        }

        return await response.json();
    },
    updateData: async (orderId: string, data: unknown) => {
        const response = await fetch(`http://localhost:5000/api/order/update/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Failed to update data: ${response.status}`);
        }

        return await response.json();
    },
    deleteOrder: async (orderId: string, data: unknown) => {
        const response = await fetch(`http://localhost:5000/api/order/delete/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Failed to delete data: ${response.status}`);
        }

        return await response.json();
    }
};
