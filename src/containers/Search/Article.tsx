import React, { Fragment } from "react";
import { BsDot } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import moment from "moment";
export default function Article(props: { article: Docs }) {
  const { article } = props;
  return (
    <div className="card">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-auto">
            <Fragment>
              <span className="avatar avatar-lg">
                <img
                  src={
                    article.multimedia[0] !== undefined
                      ? "https://static01.nyt.com/" + article.multimedia[0].url
                      : ""
                  }
                  alt="..."
                  className="avatar-img rounded"
                />
              </span>
            </Fragment>
          </div>
          <div className="col ml-n2">
            <h3 className="mb-1 text-bold">
              <b>{article.snippet}</b>
            </h3>
            <p className="small text-muted mb-1">{article.abstract}</p>
            <small className="text-muted">
              <span>
                {article.byline.person.map((u: Person, i: number) => (
                  <span>{u.firstname + " " + u.lastname}</span>
                ))}
              </span>
              <span className="mt-3">
                <BsDot />
              </span>
              <span className="mt-3">
                <FiClock size="13px" />
                {"  "}
              </span>
              <span className="mt-3">
                <time dateTime={article.pub_date}>
                  {moment(article.pub_date).fromNow()}
                </time>
              </span>
            </small>
            <h4 className="mb-1">{article.lead_paragraph}</h4>
          </div>
          <div className="col-auto"></div>
          <div className="col-auto">
            <span>
              <span className="badge badge-soft-primary">
                <b className="m-1">{article.document_type}</b>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
