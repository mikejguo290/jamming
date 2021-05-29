let accessToken;
const clientID = 'f47eca3d59e643d4893bc4a431df5da2';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        /* 
        get access token from the url returned after the users has logged in and authorized the app with spotify using Implicit Grant Flow
        Spotify Accounts Service to Redirect the user to the app passing access_token, token_type, expires_in, state in the url 
        we need to get accessTokens to pass access_tokens in requests to spotify API.
        
        from Spotify.
        If the user grants access, the final URL will contain a hash fragment with the following data encoded as a query string. 
        For example: https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123
        */
        if(accessToken){
            return accessToken;
        }
        /*
        Set the access token value
        Set a variable for expiration time
        Set the access token to expire at the value for expiration time
        Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
        */
        const url = window.location.href; // get url of current window
        
        /* 
        if the user grants access. the final url is like 
        https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123
        */
        
        if(url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)){

            // if access token does exist in url parameters, then token isn't null. set accessToken
            accessToken = url.match(/access_token=([^&]*)/)[1]; // url.match() would return null if no match is found
            const expiresIn = Number(url.match(/expires_in=([^&]*)/)[1]);// set accessToken and expiresIn properly

            // if neither expiresIn nor accessToken is null, set expiry time for accessToken. clear the parameters from the url.
            // So the app doesn't grab the access token after it has expired, clear the parameters from the url 
            window.setTimeout(() => accessToken = '', expiresIn * 1000); // clear accessToken var. window to execute a function once the timer expires. convert expiresIn to miliseconds.
            window.history.pushState('Access Token', null, '/'); // clear url of paramaters - .pushState() add an entry to the browser's session history. state, title, url, // state is meant to be a js object! wtf.

        }else if(url.match(/access_token=([^&]*)/) === null){
            /* 
            if accessToken is not set, then make a call to Spotify accounts service to request a authorization.
            this is the first call 
            */
            const redirectURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=playlist-modify-public`;
            window.location=redirectURL; // redirect user to redirect URL
        }
    },

    async savePlaylist(playlistName, trackURIs){
        /*
        save playlist to user's spotify account and save tracks to the new play lists with post request.
        1.get userID from accessToken.
        2.use userID to make post requeststs to playlist API to create a playlist
        3.assignt track uri to new playlist
        */

        // first check if these arguments have values saved to them. if not, return to terminate immediately
        // i.e. no play list name or no tracks saved to play list. 
        if(!(playlistName && trackURIs)){
            return;
        }
        //1. Get userId from access_token
        console.log('start save play list here.')
        //start by getting the current user's ID
        let url = 'https://api.spotify.com/v1/me';
        // initialise some variables
        this.getAccessToken(); // this should modify the global accessToken global variable. 
        
        let headers = {Authorization: `Bearer ${accessToken}`}
        let userID;
       
        try {
            const response = await fetch(url, {headers: headers});
            if(response.ok){
                const jsonResponse = await response.json();
                console.log(jsonResponse)
                let profile = jsonResponse;
                userID=profile.id;
            }else{
                throw new Error('Request has failed!')
            }
            
        }catch(error){
            console.log(error);
        }

        //2. POST request to create playlist API to add a playlist to user account and return the playlist ID
        url = `https://api.spotify.com/v1/users/${userID}/playlists`
        headers={
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
        let data={name: playlistName}; // add new playlist to user id 
        let playlistID; // to get data out of a try catch block, either modify a global scoped variable or return something. 

        try{
            const response = await fetch(url, {method:'POST', headers: headers, body: JSON.stringify(data)});
            if(response.ok){
                const jsonResponse = await response.json();
                const newPlaylist = jsonResponse.parse();
                playlistID = newPlaylist.id;
                console.log(`playlist ID is ${playlistID}`); // debug 
                
            }else{
                throw new Error('Request has failed!');
            }
        }catch(error){
            console.log(error);
        }
        //3. use the playlist ID and add the tracks associted with trackURIs into the playlist
        // CodeCademy hint is to set url = /v1/users/{user_id}/playlists/{playlist_id}/tracks
        url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
        headers={
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }

        data={uris:trackURIs}
        try{
            const response = await fetch( url , {method:'POST', headers: headers, body: JSON.stringify(data)});
            if (response.ok){
                /*
                what to do with the response? not sure if CodeCademy typo or the spotify API has changed but the follwoing is not possible according to documentations.
                Convert the response to JSON and save the response id parameter to a variable called playlistID. 
                */
                const jsonResponse = await response.json();
                const objResponse = jsonResponse.pars();
                const snapshotID=objResponse['snapshot_id'];
                console.log(snapshotID);

            }else{
                throw new Error('Request has failed!');
            }
            
        }catch(error){
            console.log(error);
        }

    },

    async search(searchTerm){
        /*
        search to take in a search term from user. it will eventually return a response that resolves to the list of tracks from the search
        */
        this.getAccessToken(); // this should modify the global accessToken global variable. 
        const headers = { Authorization: `Bearer ${accessToken}`} // set header to include access token. pass it as a JS object. https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
        const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`
        try{
            const response=await fetch(url, {headers: headers});
            if (response.ok){
                const jsonResponse = await response.json();
                let tracks=[]
                const tracksObjects = jsonResponse.tracks.items;
                // push formatted track objects based on returned track info to array called tracks.
                tracksObjects.forEach( track => {
                    const formattedTrack = {
                        id:track.id,
                        name:track.name,
                        artist:track.artists[0].name,
                        album:track.album.name,
                        uri:track.uri
                    };
                    tracks.push(formattedTrack);
                });
                return tracks;
            }else{
                throw new Error ('Request failed!');
            }
        }catch(error){
            console.log(error);
        };

    }
}

export {Spotify} 