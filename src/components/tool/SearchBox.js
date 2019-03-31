import React, { Component } from 'react'

export default class SearchBox extends Component {
    render() {
        return (
            <form name="searchBox">
                <input placeholder="search for owner/repo" value={this.props.search} onChange={this.props.searchIssues} />
                <input type="submit" value="search" onClick={this.props.submitSearchIssues} />
            </form>
        )
    }
}
