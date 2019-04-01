import React, { Component } from "react";
import PaginationComponent from "react-reactstrap-pagination";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: 1
    };

    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(selectedPage) {
    console.log(selectedPage);
    this.setState({ selectedPage: selectedPage }, () => {
      this.props.pageClicked(this.state.selectedPage);
    });
  }

  render() {
    return (
      <div className="row justify-content-center mt-2">
        <div className="d-flex justify-content-center">
          <PaginationComponent
            totalItems={50}
            pageSize={3}
            onSelect={this.handleSelected}
            maxPaginationNumbers={9}
            activePage={1}
          />
        </div>
      </div>
    );
  }
}
