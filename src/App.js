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
        search: "facebook/react",
        page: 1
      };
    }
  }

  searchIssues = (e) => {
    this.setState({ search: e.target.value }, () => console.log(this.state.search));
  }

  submitSearchIssues = (event) => {
    event.preventDefault();
    let searchArr = this.state.search.split("/");
    this.setState({
      repo: searchArr[1],
      owner: searchArr[0],
    }, () => this.githubAPI())

  }

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

  handleRepoInput = e => {
    this.setState({ searchRepo: e.target.value }, () => {
      console.log(this.state.searchRepo);
    });
  };

  handleSubmitSearch = () => {
    this.setState(
      {
        repo: this.state.searchRepo
      },
      () => {
        this.githubAPI();
      }
    );
  };

  handlePageClick = data => {
    this.setState({ page: data }, () => this.githubAPI());
  };

  render() {
    if (this.state.issues.length > 0) {
      return (
        <div className="App">
          <SearchBox submitSearchIssues={this.submitSearchIssues} searchIssues={this.searchIssues} search={this.state.search} />
          <Pagination pageClicked={this.handlePageClick} />
          <SearchResults issues={this.state.issues} />
        </div>
      );
    } else return <h2>Loading...!</h2>;
  }
}

export default App;
