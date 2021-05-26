import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props){
        /* 
        searchBar takes in dynamic data - key strokes, it deserves its own state. one component to show the state and aonther to change the state.
        */
        super(props);
        this.state={searchTerm:null}
        this.search=this.search.bind(this);
        this.handleTermChange=this.handleTermChange.bind(this);
    }

    search(){
        // call event handler with searchTerm. 
        this.props.onSearch(this.state.searchTerm);
    }

    handleTermChange(e){
        // receives an event and use its value to change searchTerm's state.
        const searchTerm = e.target.value;
        this.setState({searchTerm: searchTerm})
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    };
};