import { addToPlaylist } from "./add.js";
import { runOpenAI } from "./openai.js";

let iterator = 0;
let arrayIds = [];

//take the list of songs given by the AI and make an array of the ids for those songs, these ids will be used to locate the song and add to playlist later.
async function create(ArraySongs, loadingDiv, accessToken, playlistID, divContent1, divContent2, formattedData, counter){

    const listContainer = document.querySelector("#list");
    
    // Create a new unordered list element with the "list-group" class
    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group");

    document.getElementById("submitButton").style.display = "none";

    for(const [songName, artist] of Object.entries(formattedData)) {

        formattedData[songName] = artist;

    try {
        
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                q: songName,
                type: 'track'
              }
        });
        const tracks = response.data.tracks.items;

        // If there are matching tracks, extract the ID of the first one and push it into arrayIds
        if (tracks.length > 0) {
            arrayIds.push(tracks[0].id);
        }

        // Create a list item for each song and artist
        const listItem = document.createElement("a");
        listItem.classList.add("list-group-item");
        listItem.textContent = `${songName} - ${artist}`;
        listItem.href = `https://open.spotify.com/track/${arrayIds[iterator]}`;
        listItem.target = '_blank';
        listItem.style.color = 'white';
        listItem.style.backgroundColor = '#191a1b'
        // Append the list item to the unordered list
        ulElement.appendChild(listItem);
        
        iterator++;
} 



catch (error) {
    console.error('Error creating playlist:', error.response.status);
}
}


loadingDiv.style.display = 'none';

// Append the unordered list to the list container
listContainer.appendChild(ulElement);

divContent1.style.display = 'inline-block';
divContent2.style.display = 'inline-block';

console.log(arrayIds);

    divContent1.addEventListener('click', () =>{
        arrayIds = [];
        counter++;
        iterator = 0;
        runOpenAI(ArraySongs, loadingDiv, accessToken, playlistID, divContent1, divContent2, counter);
    })

    divContent2.addEventListener('click', () =>{

        addToPlaylist(arrayIds, accessToken, playlistID);
    });
        
}

export {create};