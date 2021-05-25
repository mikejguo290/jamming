import React from 'react';
import './TrackList.css'
import {Track} from '../Track/Track'

export class TrackList extends React.Component {

    render(){
        let tracks = this.props.tracks;
        tracks = tracks.map( track => <Track key={track.id} name={track.name} artist={track.artist} album={track.artist} /> )

        return (
            <div className="TrackList">
                {tracks}
            </div>
        )
    }
}