import React, { Component } from 'react'

export default class SearchBox extends Component {
    render() {
        return (
            <div>
                Searching bar 
                <input placeholder="moron owner"
                // onChange = {(e) => this.props.searchText(e.target.value)}
                />
                <input placeholder="repo name"/>
                
               
            </div>
        )
    }
}
