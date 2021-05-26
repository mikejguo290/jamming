import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import './App.css';

export class App extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            searchResults: [ 
                { 
                    id: 1,
                    name:'Fix You', 
                    artist : 'Coldplay', 
                    album: 'XYZ' 
                },
                {   
                    id: 2,
                    name:'Blinding Lights', 
                    artist: 'The Weeknd', 
                    album:'Blinding Lights'
                },
                {   
                    id: 3,
                    name:'Hang with me',
                    artist:'Robyn',
                    album:'Body Talk'
                }
            ],
            playlistName: 'New Playlist',
            playlistTracks: [ 
                {   
                    id: 4,
                    name:'Physical', 
                    artist : 'Dua Lipa', 
                    album: 'Future Nostalgia' 
                },
                { 
                    id: 5,
                    name:'Starboy', 
                    artist: 'The Weeknd', 
                    album:'Starboy'
                },
                {   
                    id: 6,
                    name:'Take on Me',
                    artist:'a-ha',
                    album:'Hunting High and Low'
                }
            ]

        };
        this.addTrack=this.addTrack.bind(this); // bind eventHandler method to this.
        this.removeTrack=this.removeTrack.bind(this);
        this.updatePlaylistName=this.updatePlaylistName.bind(this);
        this.savePlaylist=this.savePlaylist.bind(this);
        this.search=this.search.bind(this);
    };

    search(searchTerm){
        /* accept a search term and then send search parameter to spotify API and updates searchResults with the user's search results. */
        // for now, all it has to do is to accept a searchTerm and then log it to the console.
        console.log(searchTerm);
    }

    savePlaylist(){
        /* get a list of track uris from playlistTracks.*/
        const playlistTracks=this.state.playlistTracks
        const trackURIs = playlistTracks.map(track => track.uri);
        return trackURIs;
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