import { create } from "./create.js";
const apiKey = 'API_KEY'; //OpenAI API key goes here

//function to give AI your songs and get a recommended list in return
async function runOpenAI(ArraySongs, loadingDiv, accessToken, playlistID, divContent1, divContent2, counter) {

    if(counter > 1){
        document.getElementById("list").innerHTML = '';
        loadingDiv.style.display = 'block';
        divContent1.style.display = 'none';
        divContent2.style.display = 'none';
    }

    const messages = [
        { role: "assistant", content: 'Your job is to recommend a NEW playlist based on the given playlist, DO NOT GIVE ME THE SAME SONGS. Output it as a MAP with only song name and artist name linked to eachother, like this "Song": "Artist".'},
        { role: "user", content: `Here is the playlist I want to use for the recommendation: ${JSON.stringify(ArraySongs)}` }
    ];

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                messages,
                model: "gpt-3.5-turbo",
                max_tokens: 400
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            }  
        );

        const responseData = response.data.choices[0].message.content;

        // Parse the response JSON string into an object
        const parsedData = JSON.parse(responseData);
    
        // Create an empty object to store the formatted data
        const formattedData = {};


        // Iterate over the parsed data and structure it in the desired format
        for (const [song, artist] of Object.entries(parsedData)) {
            formattedData[song] = artist;
        }

    create(ArraySongs, loadingDiv, accessToken, playlistID, divContent1, divContent2, formattedData ,counter);
        
    } catch (error) {
        loadingDiv.style.display = 'none'   ;
        console.error('Error:', error);
        alert('An error occurred. Please refresh the page.');
    }   
}

export { runOpenAI }; // Export the function for use in other modules