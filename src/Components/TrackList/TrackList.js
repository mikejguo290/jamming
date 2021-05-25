import React from 'react';
import './TrackList.css'
import {Track} from '../Track/Track'

export class TrackList extends React.Component {
    render(){
        return (
            <div class="TrackList">
                <Track />
                <!-- You will add a map method that renders a set of Track components  -->
                <h2>Stand in track values</h2>
                <ol>
                    <li>In the End</li>
                    <li>Faint</li>
                    <li>New Divide</li>
                </ol>
            </div>
        )
    }
}