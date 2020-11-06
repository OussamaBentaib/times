import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APIKEY } from "../../constants/constants";
import { getdataStart, getSearchSuccess } from "../../store/actions";
import Article from "./Article";

export default function Search() {
  const [isFetched, setIsFetched] = useState(false);
  const [isFetchedSection, setIsFetchedSection] = useState<string | null>(null);
  const query = window.location.search.split("?query=")[1];
  const state: initState | undefined = useSelector((state: initState) => state);
  const { loading, search } = state;
  const dispatch = useDispatch();
  const onFetchTheSearch = (query: string) => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${APIKEY}`;
    dispatch(getdataStart(true));
    dispatch(getSearchSuccess(null));
    Axios.get(url)
      .then((response) => {
        console.log(response);
        const Search: Search = response.data;
        dispatch(getdataStart(false));
        dispatch(getSearchSuccess(Search));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    /***
     * isFetched means that whwn we call the apis for the first time
     * it's will set to true,
     * isFetchedSection we have to know which section we fetched because when
     * we will change the url we need to call a new apis
     *
     */
    if (!isFetched || isFetchedSection !== query) {
      /**
       * Set the isFetched to true, and the section
       * that we just fetched because we don't
       * want the apis for fetch more than once!
       * That's importants for the apis
       */
      setIsFetchedSection(query);
      setIsFetched(true);
      /***
       * Now fetch the apis
       * we will pass the section when we're callin the
       * fetch Search
       * for example "arts", as default 'home'
       */
      onFetchTheSearch(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchTheSearch, query, isFetchedSection]);
  return (
    <div>
      <div className="row mt-4 mt-md-5">
        <div className="col-12 col-xl-8">
          {loading && <p>Loading....</p>}
          <div className="card-header mb-3 border-0">
            <h4 className="card-header-title">
              Search results for <b>{JSON.stringify(query)}</b>
            </h4>
          </div>
          {search &&
            search.response.docs.map((doc: Docs, index: number) => (
              <Article key={index} article={doc} />
            ))}
        </div>
        <div className="col-12 col-xl-4">
          <div className="card pt-5 pb-5 pl-2 pr-2">
            <div className="row justify-content-center mb-2">
              <div className="col-auto mt-3 mb-3">
                <ul className="nav">
                  <li className="nav-item">
                    <img
                      style={{ width: 100 }}
                      src={
                        "https://apogeedigital.com/wp-content/uploads/2015/10/the-new-york-times-logo-vert.png"
                      }
                      alt="..."
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col col-md-auto text-center">
                <small className="text-muted">
                  Copyright (c) 2020 The New York Times Company.
                  <br /> All Rights Reserved.
                </small>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col col-md-auto text-center">
                <small className="text-muted">
                  Project by {"  "}
                  <a href="https://beosama.com/">Osama Bentaib</a>{" "}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
