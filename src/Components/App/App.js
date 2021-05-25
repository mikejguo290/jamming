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
                    name:'Fix You', 
                    artist : 'Coldplay', 
                    album: 'XYZ' 
                },
                { 
                    name:'Blinding Lights', 
                    artist: 'The Weeknd', 
                    album:'Blinding Lights'
                },
                {
                    name:'Hang with me',
                    artist:'Robyn',
                    album:'Body Talk'
                }
            ],
            playlistName: 'Relaxing',
            playlistTracks: [ 
                { 
                    name:'Physical', 
                    artist : 'Dua Lipa', 
                    album: 'Future Nostalgia' 
                },
                { 
                    name:'Starboy', 
                    artist: 'The Weeknd', 
                    album:'Starboy'
                },
                {
                    name:'Take on Me',
                    artist:'a-ha',
                    album:'Hunting High and Low'
                }
            ]

        };
    };

    render (){
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults}/>
                    <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
                    </div>
                </div>
            </div>
            )
        }
}