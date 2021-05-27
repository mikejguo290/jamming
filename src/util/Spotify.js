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
        
        accessToken = url.match(/access_token=([^&]*)/); // would return null if no match is found
        const expiresIn = url.match(/expires_in=([^&]*)/);
        
        if(accessToken && expiresIn){
            // if neither expiresIn nor accessToken is null, set expiry time for accessToken. clear the parameters from the url.
            // So the app doesn't grab the access token after it has expired, clear the parameters from the url 
            window.setTimeout(() => accessToken = '', expiresIn * 1000); // clear accessToken var. window to execute a function once the timer expires. convert expiresIn to miliseconds.
            window.history.pushState('Access Token', null, '/'); // clear url of paramaters - .pushState() add an entry to the browser's session history. state, title, url, // state is meant to be a js object! wtf.

        }else if(accessToken === null){
            /* 
            if accessToken is not set, then make a call to Spotify accounts service to request a authorization.
            this is the first call 
            */
            const redirectURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=playlist-modify-private`;
            window.location=redirectURL; // redirect user to redirect URL
        }

        
    }
}

export {Spotify} 