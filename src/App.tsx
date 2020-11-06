import React, { Fragment } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Header from "./containers/Header/Header";
import Search from "./containers/Search/Search";
import MostPopular from "./containers/MostPopular/MostPopular";
import TopStories from "./containers/TopStories/TopStories";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <div className="main-content">
          <div className="container">
            <Route exact path="/">
              <Redirect to="/stories/home/" />
            </Route>
            <Route path="/stories/:section/">
              <TopStories />
            </Route>
            <Route path="/popular/:section/">
              <MostPopular />
            </Route>
            <Route path="/search/">
              <Search />
            </Route>
          </div>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
