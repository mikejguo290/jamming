import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import './App.css';

export class App extends React.Component {

render (){
    return (
        <div>
            <h1>Ja<span class="highlight">mmm</span>ing</h1>
            <div class="App">
                <!-- Add a SearchBar component -->
                <div class="App-playlist">
                <!-- Add a SearchResults component -->
                <!-- Add a Playlist component -->
                </div>
            </div>
        </div>
        )
    }
}