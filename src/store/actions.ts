import {
  GET_THE_STORIES_DATA,
  GET_THE_POPULAR_DATA,
  LOADING,
  GET_THE_SEARCH_DATA,
} from "./actionTypes";

export const getStoriesSuccess = (stories: TopStories | null) => ({
  type: GET_THE_STORIES_DATA,
  payload: stories,
});
export const getPopularSuccess = (stories: MostPopular | null) => ({
  type: GET_THE_POPULAR_DATA,
  payload: stories,
});
export const getSearchSuccess = (search: Search | null) => ({
  type: GET_THE_SEARCH_DATA,
  payload: search,
});
export const getdataStart = (loading: Boolean) => ({
  type: LOADING,
  loading: loading,
});
