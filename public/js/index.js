// index.js
import { runOpenAI } from "./openai.js";

let counter = 1;
const playlistIdInput = document.querySelector('#playlist');
const submitBTN = document.querySelector('#submitButton');
const loadingDiv = document.querySelector('#loading');

// Retrieve the access token from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const accessToken = urlParams.get('access_token');

const ArraySongs = [];

submitBTN.addEventListener("click", async (event) => {
    event.preventDefault();
    submitBTN.style.display = 'none';
    // Display loading symbol
    loadingDiv.style.display = 'block';

    const playlistID = playlistIdInput.value;

    try {
        
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        const data = response.data;
        data.tracks.items.forEach(item => {
            ArraySongs.push(item.track.name);
        });

        console.log('Array of Songs:', ArraySongs);

    const buttonContainer = document.getElementById('buttonContainer');
    

    var divContent1 = document.createElement('button');
    var divContent2 = document.createElement('button');

    divContent1.setAttribute('type', 'submit');
    divContent2.setAttribute('type', 'submit');
    divContent1.classList.add('btn', 'btn-primary');
    divContent2.classList.add('btn', 'btn-primary');

    
    divContent1.style.display = 'none';
    divContent1.style.margin = '20px';
    divContent2.style.display = 'none';
    divContent2.style.margin = '20px';

    divContent1.textContent = "Refresh";
    divContent2.textContent = "Add To Playlist";

    buttonContainer.appendChild(divContent1);
    buttonContainer.appendChild(divContent2); 

    runOpenAI(ArraySongs, loadingDiv, accessToken, playlistID, divContent1, divContent2, counter);

    } catch (error) {
        console.error('Error fetching playlist:', error.response.status);
    }
});
