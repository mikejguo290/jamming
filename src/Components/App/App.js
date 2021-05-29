import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify';
import './App.css';

export class App extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            searchResults: [ 
                { 
                    album:'Infest',
                    artist: 'Papa Roach',
                    id: '5W8YXBz9MTIDyrpYaCg2Ky',
                    name:'Last Resort', 
                    uri:'spotify:track:5W8YXBz9MTIDyrpYaCg2Ky'
                },
                {   
                    album:'X&Y',
                    artist: 'Coldplay',
                    id: '7LVHVU3tWfcxj5aiPFEW4Q',
                    name:'Fix You', 
                    uri:'spotify:track:7LVHVU3tWfcxj5aiPFEW4Q'
                },
                {   
                    album:'Body Talk',
                    artist: 'Robyn',
                    id: '1U5XoeYZ4oOftvEKpAJUmP',
                    name:'Hang With Me', 
                    uri:'spotify:track:1U5XoeYZ4oOftvEKpAJUmP'
                }
            ],
            playlistName: 'New Playlist',
            playlistTracks: [
                { 
                    album:'The Family Jewels',
                    artist: 'MARINA',
                    id: '0fiPpwBPIaxxydn4KzX9Tc',
                    name:'I Am Not a Robot', 
                    uri:'spotify:track:0fiPpwBPIaxxydn4KzX9Tc'
                }, 
                {
                    album:"Future Nostalgia",
                    artist:"Dua Lipa",
                    id:"3AzjcOeAmA57TIOr9zF1ZW",
                    name:"Physical",
                    uri:"spotify:track:3AzjcOeAmA57TIOr9zF1ZW"
                },
                {
                    album:"Starboy",
                    artist:"The Weeknd",
                    id:"7MXVkk9YMctZqd1Srtv4MB",
                    name:"Starboy",
                    uri:"spotify:track:7MXVkk9YMctZqd1Srtv4MB"
                }
            ]

        };
        this.addTrack=this.addTrack.bind(this); // bind eventHandler method to this.
        this.removeTrack=this.removeTrack.bind(this);
        this.updatePlaylistName=this.updatePlaylistName.bind(this);
        this.savePlaylist=this.savePlaylist.bind(this);
        this.search=this.search.bind(this);
    };

    async search(searchTerm){
        /* accept a search term and then send search parameter to spotify API and updates searchResults with the user's search results. */

        // use imported search function from spotify.
        const searchResults=await Spotify.search(searchTerm);
        this.setState({searchResults: searchResults});
    }

    async savePlaylist(){
        /* get a list of track uris from playlistTracks.*/
        const playlistTracks=this.state.playlistTracks;
        console.log(this.state.playlistTracks);

        const trackURIs = playlistTracks.map(track => track.uri);
        console.log(trackURIs)
       
        await Spotify.savePlaylist(this.state.playlistName, trackURIs);
        // after calling savePlaylist, reset the playlist name and playlist tracks saved in state. 
        this.setState({playlistName: 'New Playlist'});
        this.setState({playlistTracks: []});
    }

    addTrack(track){
        /* add track from search result to playlist. */
        // if track.id isn't already included in playlistTracks. add it to playlistTracks. set state
        const playlistTracks = this.state.playlistTracks;
        if (playlistTracks.find(savedTrack => savedTrack.id===track.id)){
            return; // break out of the method if it finds a matching id
        }
        
        // go on with the method if nothing prior returned.
        const tracks = playlistTracks.concat(track);
        this.setState({playlistTracks: tracks});
        
    }
    removeTrack(track){
        /* remove track from playlist */
        const playlistTracks=this.state.playlistTracks;
        // if data passed in through callbacks is the same as the representation of tracks stored in state. 
        if(playlistTracks.find(savedTrack => savedTrack.id===track.id)){
            // if track's id matches id of the tracks in playlist. 
            const trackIndex = playlistTracks.findIndex(savedTrack => savedTrack.id===track.id);
            playlistTracks.splice(trackIndex,1); // remove just the one element at trackIndex.
            this.setState({playlistTracks: playlistTracks})
        }
    }

    updatePlaylistName(name){
        /* update the name of the playlist , pass name arg to setState()*/
        const playlistName=this.state.playlistName;
        if(name!==playlistName){
            this.setState({playlistName: name});
        }
    }

    render (){
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                    <Playlist 
                        onNameChange={this.updatePlaylistName} 
                        onRemove={this.removeTrack} 
                        onSave={this.savePlaylist}
                        playlistName={this.state.playlistName} 
                        playlistTracks={this.state.playlistTracks}
                    />
                    </div>
                </div>
            </div>
            )
        }
}