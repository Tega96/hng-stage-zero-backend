import express from 'express';
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const catFactApi = 'https://catfact.ninja/fact';

// Default home page
app.get('/', (req, res) => {
    res.send('Welcome to my profile API! Visit /me to see my profile info.')
})

// Read /me endpoint
app.get('/me', async (req, res) => {
    try {
        // Fetch cat fact from external API
        const response = await axios.get(catFactApi);
        const result = response.data.fact;
        res.status(200).json({
            status: 'success',
            user: {
                email: "otiteotega@gmail.com",
                name: "Otega Otite",
                stack: ['Node.js/Express', 'React', 'MongoDB', 'SQL', 'JavaScript'],
            },
            timestamp: new Date().toISOString,
            fact: result,
        })

        
    } catch (error) {
        console.error('Failed to fetch cat fact', error.messsage)
        res.status(500).json({
            message: 'Error Loading file', 
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    };
});


app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})

