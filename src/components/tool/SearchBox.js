import React, { Component } from "react";

export default class SearchBox extends Component {
  render() {
    return (
      <div className="row justify-content-center my-1">
        <form name="searchBox">
          <input
            className="searchbox-style"
            placeholder="search for owner/repo"
            value={this.props.search}
            onChange={this.props.searchIssues}
          />
          <input
            className="btn-submit-style"
            type="submit"
            value="search"
            onClick={this.props.submitSearchIssues}
          />
        </form>
      </div>
    );
  }
}
