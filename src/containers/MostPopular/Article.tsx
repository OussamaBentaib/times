import React, { Fragment } from "react";
import { BsDot } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import moment from "moment";
export default function Article(props: { article: Popular }) {
  const { article } = props;
  return (
    <div className="card">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-auto">
            {article.media.map((media: Media, i: number) => (
              <Fragment>
                <span className="avatar avatar-lg">
                  <img
                    src={
                      media["media-metadata"][2].url === undefined
                        ? media["media-metadata"][1].url === undefined
                          ? media["media-metadata"][0].url
                          : media["media-metadata"][1].url
                        : media["media-metadata"][2].url
                    }
                    alt="..."
                    className="avatar-img rounded"
                  />
                </span>
              </Fragment>
            ))}
          </div>
          <div className="col ml-n2">
            <h3 className="mb-1 text-bold">
              <b>{article.title}</b>
            </h3>
            <p className="small text-muted mb-1">{article.abstract}</p>
            <small className="text-muted">
              <span>{article.byline !== "" ? article.byline : "Untitled"}</span>
              <span className="mt-3">
                <BsDot />
              </span>
              <span className="mt-3">
                <FiClock size="13px" />
                {"  "}
              </span>
              <span className="mt-3">
                <time dateTime={article.published_date}>
                  {moment(article.published_date).fromNow()}
                </time>
              </span>
            </small>
          </div>
          <div className="col-auto"></div>
          <div className="col-auto">
            <span>
              <span className="badge badge-soft-primary">
                <b className="m-1">{article.section}</b>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
