import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
// import SearchBox from "./components/tool/SearchBox";
// import Pagination from "./components/pagination/Pagination";
// import SearchResults from "./components/page/SearchResults";
const ReactMarkdown = require("react-markdown");

const clientId = process.env.REACT_APP_CLIENT_ID;
const apiURL = `https://api.github.com`;

class IssueDetail extends Component {
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
        page: ""
      };
    }

    if (existingToken) {
      this.state = {
        token: existingToken,
        issuesDetail: {},
        owner: "facebook",
        repo: "react",
        search: "",
        userDetail: [],
        pullRequest: {}
      };
    }
  }

  githubAPI = async () => {
    console.log("aa", this.props);
    const { params } = await this.props.match;
    const number = params.number;
    let { owner, repo, token } = this.state;
    let response = await fetch(
      `${apiURL}/repos/${owner}/${repo}/issues/${number}?access_token=${token}`
    );
    let issues = await response.json();
    this.setState(
      {
        issuesDetail: issues,
        userDetail: issues.user,
        pullRequest: issues.pull_request
      },
      () => console.log("userdetail", this.state.userDetail)
    );
    console.log("detail", this.state.issuesDetail);
    console.log("request", this.state.pullRequest);
  };

  componentDidMount() {
    this.githubAPI();
  }

  render() {
    return (
      <div className="container">
        <h3>View Issues From #{this.state.issuesDetail.number}</h3>
        <div className="container d-flex ">
          <div className="col-3">
            <div className="ui card">
              <div className="image">
                <img src={this.state.userDetail.avatar_url} alt="logo" />
              </div>
              <div className="content">
                <p className="header">{this.state.userDetail.login}</p>
                <div className="meta">
                  <span className="date">Joined in 2013</span>
                </div>
                <div className="description">
                  Kristy is an art director living in New York.
                </div>
              </div>
              <div className="extra content">
                <p>22 Friends</p>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row my-3">
              <div class="ui segment">
                <h2>{this.state.issuesDetail.title}</h2>{" "}
                <span>{this.state.issuesDetail.created_at}</span>
                <div class="ui raised segment">
                  <ReactMarkdown source={this.state.issuesDetail.body} />
                </div>
              </div>
            </div>
            <div className="row">
              <div class="ui minimal comments">
                <h3 class="ui dividing header">Comments</h3>

                <div class="comment">
                  <a class="avatar">
                    <img src="/images/avatar/small/elliot.jpg" />
                  </a>
                  <div class="content">
                    <a class="author">Elliot Fu</a>
                    <div class="metadata">
                      <span class="date">Yesterday at 12:30AM</span>
                    </div>
                    <div class="text">
                      <p>
                        This has been very useful for my research. Thanks as
                        well!
                      </p>
                    </div>
                    <div class="actions">
                      <a class="reply">Reply</a>
                    </div>
                  </div>
                  <div class="comments">
                    <div class="comment">
                      <a class="avatar">
                        <img src="/images/avatar/small/jenny.jpg" />
                      </a>
                      <div class="content">
                        <a class="author">Jenny Hess</a>
                        <div class="metadata">
                          <span class="date">Just now</span>
                        </div>
                        <div class="text">
                          Elliot you are always so right :)
                        </div>
                        <div class="actions">
                          <a class="reply">Reply</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IssueDetail;
