import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "./components/tool/SearchBox";
import Pagination from "./components/pagination/Pagination";
<<<<<<< HEAD
// import SearchResults from "./components/page/SearchResults";
import IssueDetail from "./components/page/IssueDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";
=======
import SearchResults from "./components/page/SearchResults";
>>>>>>> 732d834ab8eb8f7741bfe75aa21302f3e043fd7c

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
<<<<<<< HEAD
        page: ""
=======
        page: 1
>>>>>>> 732d834ab8eb8f7741bfe75aa21302f3e043fd7c
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

<<<<<<< HEAD
  render() {
    if (this.state.issues.length > 0) return <div />;
    else return <h2>Loading...!</h2>;
=======
  handleClick = data => {
    this.setState(
      {
        page: data
      },
      () => {
        this.githubAPI(this.state.page);
      }
    );
  };

  render() {
    if (this.state.issues.length > 0) {
      console.log(this.state.issues);
      return (
        <div>
          <SearchBox />
          <Pagination pageClicked={this.handleClick} />

          <SearchResults issues={this.state.issues} />
        </div>
      );
    } else return <h2>Loading...!</h2>;
>>>>>>> 732d834ab8eb8f7741bfe75aa21302f3e043fd7c
  }
}

export default App;
