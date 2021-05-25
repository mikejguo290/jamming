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
            playlistName: 'Relaxing',
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
    };

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

    render (){
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                    <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
                    </div>
                </div>
            </div>
            )
        }
}