type multimedia = {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
};
type Story = {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: multimedia[];
  short_url: string;
};

type TopStories = {
  status: string;
  copyright: string;
  section: string;
  last_updated: string;
  num_results: number;
  results: Story[];
};
type MediaMetadata = {
  url: string;
  format: string;
  height: number;
  width: number;
};
type Media = {
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
  approved_for_syndication: number;
  "media-metadata": MediaMetadata[];
};

type Popular = {
  uri: string;
  url: string;
  id: number;
  asset_id: number;
  source: string;
  published_date: string;
  updated: string;
  section: string;
  subsection: string;
  nytdsection: string;
  adx_keywords: string;
  byline: string;
  type: string;
  title: string;
  abstract: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  media: Media[];
  eta_id: number;
};

type MostPopular = {
  status: string;
  copyright: string;
  num_results: number;
  results: Popular[];
};

type DocsMedia = {
  rank: number;
  subtype: string;
  caption?: string;
  credit?: string;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Legacy;
  subType: string;
  crop_name: string;
};
type Legacy = {
  xlarge: string;
  xlargewidth: number;
  xlargeheight: number;
};
type HeadLine = {
  main: string;
  kicker?: string;
  content_kicker?: string;
  print_headline?: string;
  name: string;
  seo: string;
  sub: string;
};
type Person = {
  firstname: string;
  middlename?: string;
  lastname: string;
  qualifier?: string;
  title?: string;
  role?: string;
  organization?: string;
  rank: number;
};
type Keywords = {
  name: string;
  value: string;
  rank: number;
  major: number;
};
type BYLINE = {
  original: string;
  person: Person[];
  organization?: string;
};
type Docs = {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_section: string;
  print_page: string;
  source: string;
  multimedia: DocsMedia[];
  headline: HeadLine;
  keywords: Keywords[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name: string;
  byline: BYLINE;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
};
type Meta = {
  hits: number;
  offset: number;
  time: number;
};
type SearchResponse = {
  docs: Docs[];
  meta: Meta;
};
type Search = {
  status: string;
  copyright: string;
  response: SearchResponse;
};
type NewsSource = {
  id?: string | undefined | null;
  name?: string | null;
};
type NewsArticle = {
  source?: NewsSource | null;
  author?: string | null;
  title?: string | null;
  description?: string | null;
  url?: string | null;
  urlToImage?: string | null;
  publishedAt?: string | null;
  content?: string | null;
};
type News = {
  status: string;
  totalResults: number;
  articles?: NewsArticle[];
};
