import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { APIKEY, TRENDING } from "../../constants/constants";
import { getdataStart, getStoriesSuccess } from "../../store/actions";
import SingleStory from "./SingleStory";

export default function TopStories() {
  const [isFetched, setIsFetched] = useState(false);
  const [isFetchedSection, setIsFetchedSection] = useState<string | null>(null);
  const section = window.location.pathname.split("stories/")[1].split("/")[0];
  const state: initState | undefined = useSelector((state: initState) => state);
  const { loading, stories } = state;
  const dispatch = useDispatch();
  const onFetchTheStories = (section: string) => {
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${APIKEY}`;
    dispatch(getdataStart(true));
    dispatch(getStoriesSuccess(null));
    Axios.get(url)
      .then((response) => {
        const stories: TopStories = response.data;
        dispatch(getdataStart(false));
        dispatch(getStoriesSuccess(stories));
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
    if (!isFetched || isFetchedSection !== section) {
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
      onFetchTheStories(section);
    }
    /**
     * this comment bellow will disable react hooks exhaustive deps
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchTheStories, section, isFetchedSection]);
  const onWindowChange = (tr: string) => {
    if (!isFetched || isFetchedSection !== tr) {
      setIsFetchedSection(tr);
      /**
       * Set the isFetched to true, and the section
       * that we just fetched because we don't
       * want the apis for fetch more than once!
       * That's importants for the apis
       */
      setIsFetched(true);
      /***
       * Now fetch the apis
       * we will pass the section when we're callin the
       * fetch stories
       * for example "arts", as default 'home'
       */
      onFetchTheStories(tr);
    }
  };
  return (
    <div>
      <div className="row mt-4 mt-md-5">
        <div className="col-12 col-xl-8">
          {loading && (
            <div className="text-center mt-3 mb-3">
              <p>Loading....</p>
            </div>
          )}
          {stories &&
            stories.results.map((story: Story, index: number) => (
              <SingleStory key={index} story={story} />
            ))}
        </div>
        <div className="col-12 col-xl-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title">Trending stories</h4>
            </div>
            <div className="card-body">
              {TRENDING.map((tr: string, i: number) => (
                <Link
                  to={`/stories/${tr}/`}
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
