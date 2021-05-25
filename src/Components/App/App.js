import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import './App.css';

export class App extends React.Component {

    constructor(props){
        super(props);
        this.state = { searchResults: [ 
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
        ]};
    };

    render (){
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults}/>
                    <Playlist />
                    </div>
                </div>
            </div>
            )
        }
}