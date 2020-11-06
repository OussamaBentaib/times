import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { APIKEY, TYPES } from "../../constants/constants";
import { getdataStart, getPopularSuccess } from "../../store/actions";
import Article from "./Article";

export default function MostPopular() {
  const [isFetched, setIsFetched] = useState(false);
  const [isFetchedSection, setIsFetchedSection] = useState<string | null>(null);
  const [period, setPeriod] = useState(1);
  const section = window.location.pathname.split("popular/")[1].split("/")[0];
  const state: initState | undefined = useSelector((state: initState) => state);
  const { loading, popular } = state;
  const dispatch = useDispatch();
  const onFetchThePopular = (section: string, period: number) => {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/${section}/${period}.json?api-key=${APIKEY}`;
    dispatch(getdataStart(true));
    dispatch(getPopularSuccess(null));
    Axios.get(url)
      .then((response) => {
        const popular: MostPopular = response.data;
        dispatch(getdataStart(false));
        dispatch(getPopularSuccess(popular));
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
    if (!isFetched) {
      /**
       * Set the isFetched to true, and the section
       * that we just fetched because we don't
       * want the apis for fetch more than once!
       * That's importants for the apis
       */
      setIsFetchedSection(section);
      setIsFetched(true);
      /***
       * Now fetch the apis
       * we will pass the section when we're callin the
       * fetch stories
       * for example "arts", as default 'home'
       */
      onFetchThePopular(section, 7);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchThePopular, section, isFetchedSection]);
  const onWindowChange = (tr: string) => {
    if (!isFetched || isFetchedSection !== tr) {
      /**
       * Set the isFetched to true, and the section
       * that we just fetched because we don't
       * want the apis for fetch more than once!
       * That's importants for the apis
       */
      setIsFetchedSection(tr);
      setIsFetched(true);
      /***
       * Now fetch the apis
       * we will pass the section when we're callin the
       * fetch stories
       * for example "arts", as default 'home'
       */
      onFetchThePopular(section, period);
    }
  };
  const onPeriedChange = (pr: number) => {
    onFetchThePopular(section, pr);
  };
  return (
    <div>
      <div className="row mt-4 mt-md-5">
        <div className="col-12 col-xl-8">
          {
            <div className="card-header mb-3 border-0">
              <h4
                className="card-header-title"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                role="button"
              >
                Most popular on last {period === 1 && <b>day</b>}
                {period === 7 && <b>week</b>}
                {period === 30 && <b>month</b>}
                <FiChevronDown className="ml-1" />
              </h4>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setPeriod(1);
                    onPeriedChange(1);
                  }}
                >
                  Day
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setPeriod(7);
                    onPeriedChange(7);
                  }}
                >
                  Week
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setPeriod(30);
                    onPeriedChange(30);
                  }}
                >
                  month
                </button>
              </div>
            </div>
          }
          {loading && <p>Loading....</p>}
          {popular &&
            popular.results.map((article: Popular, index: number) => (
              <Article key={index} article={article} />
            ))}
        </div>
        <div className="col-12 col-xl-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title">Most popular</h4>
            </div>
            <div className="card-body">
              {TYPES.map((tr: string, i: number) => (
                <Link
                  to={`/popular/${tr}/`}
                  key={i}
                  className="btn btn-sm btn-white m-1"
                >
                  <span
                    onClick={() => onWindowChange(tr)}
                    className="pl-2 pr-2 text-dark"
                  >
                    <b>{tr}</b>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
