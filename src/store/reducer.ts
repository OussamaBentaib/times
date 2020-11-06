import {
  GET_THE_SEARCH_DATA,
  GET_THE_POPULAR_DATA,
  GET_THE_STORIES_DATA,
  LOADING,
} from "./actionTypes";
const initialState: initState = {
  stories: null,
  popular: null,
  search: null,
  loading: false,
};
const reducer = (state: initState = initialState, action: any): initState => {
  switch (action.type) {
    case LOADING:
      const loading: boolean = action.loading;
      return {
        ...state,
        loading: loading,
      };
    case GET_THE_STORIES_DATA:
      const stories: TopStories | null = action.payload;
      return {
        ...state,
        stories: stories,
      };
    case GET_THE_POPULAR_DATA:
      const popular: MostPopular | null = action.payload;
      return {
        ...state,
        popular: popular,
      };
    case GET_THE_SEARCH_DATA:
      const search: Search | null = action.payload;
      return {
        ...state,
        search: search,
      };
    default:
      return { ...state };
  }
};

export default reducer;
