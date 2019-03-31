import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "./components/tool/SearchBox";
import Pagination from "./components/pagination/Pagination";
import SearchResults from "./components/page/SearchResults";

const clientId = process.env.REACT_APP_CLIENT_ID;
const apiURL = `https://api.github.com`;

class App extends Component {
  constructor(props) {
    super(props);
    const existingToken = sessionStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;

    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);

      sessionStorage.setItem("token", accessToken);
      this.state = {
        token: accessToken,
        issues: [],
        owner: "",
        repo: "",
        search: "",
        page: 1
      };
    }

    if (existingToken) {
      this.state = {
        token: existingToken,
        issues: [],
        owner: "facebook",
        repo: "react",
        search: "",
        page: 1
      };
    }
  }

  searchIssues = e => {
    this.setState({ search: e.target.value.toLowerCase() }, () =>
      console.log(this.state.search)
    );
  };

  submitSearchIssues = event => {
    event.preventDefault();
    let searchArr = this.state.search.split("/");
    this.setState(
      {
        repo: searchArr[1],
        owner: searchArr[0]
      },
      () => this.githubAPI()
    );
  };

  githubAPI = async () => {
    let { owner, repo, token, page } = this.state;
    let response = await fetch(
      `${apiURL}/repos/${owner}/${repo}/issues?access_token=${token}&page=${page}&per_page=20`
    );
    let issues = await response.json();
    this.setState(
      {
        issues: issues
      },
      () => console.log(this.state.issues)
    );
  };

  componentDidMount() {
    this.githubAPI();
  }

  handlePageClick = data => {
    this.setState({ page: data }, () => this.githubAPI());
  };

  render() {
    if (this.state.issues.length > 0) {
      return (
        <div className="App">
          <div className="navBarr fixed-top mb-5">
            <div className="position-nav">
              <Pagination pageClicked={this.handlePageClick} />
              <SearchBox
                submitSearchIssues={this.submitSearchIssues}
                searchIssues={this.searchIssues}
                search={this.state.search}
              />
            </div>
          </div>
          <div className="searchBody">
            <SearchResults
              issues={this.state.issues}
              owner={this.state.owner}
              repo={this.state.repo}
            />
          </div>
        </div>
      );
    } else
      return (
        <div className="justify-content-center d-flex align-items-center">
          <div class="spinner-border text-primary" role="status" />
          <div class="spinner-border text-secondary" role="status" />
          <div class="spinner-border text-success" role="status" />
          <div class="spinner-border text-danger" role="status" />
          <div class="spinner-border text-warning" role="status" />
          <div class="spinner-border text-info" role="status" />
          <div class="spinner-border text-light" role="status" />
          <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      );
  }
}

export default App;
