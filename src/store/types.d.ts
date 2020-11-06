type initState = {
  stories?: TopStories | null;
  popular?: MostPopular | null;
  search?: Search | null;
  loading: boolean;
};

type Actions = {
  type: string;
  payload: any;
};

type DispatchType = (args: Actions) => Actions;
