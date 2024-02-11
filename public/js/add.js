//Will add each song in array to your playlist using the track ID.
async function addToPlaylist(arrayIds, accessToken, playlistId) {

    console.log('Size = ', arrayIds.length);

    for (let i = 0; i < arrayIds.length; i++) {
        try {
            const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                uris: [`spotify:track:${arrayIds[i]}`] // Convert trackId to Spotify URI format
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Song added to playlist:', response.data);
        } 
        catch (error) {
            // Handle errors with response data
            console.error('Error adding song to playlist:', error.response.data);
            throw error;
        }
    }
}

export {addToPlaylist};