import React from "react";
import { FiClock, FiExternalLink } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import moment from "moment";
import { Link } from "react-router-dom";
export default function SingleStory(props: { story: Story }) {
  const { story } = props;
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-3">
          <div className="row align-items-center">
            <div className="col ml-n2">
              <h3 className="mb-1 text-bold">
                <b>{story.title}</b>
              </h3>
              <p className="card-text small text-muted">
                <span>{story.byline !== "" ? story.byline : "Untitled"}</span>
                <span className="mt-3">
                  <BsDot />
                </span>
                <span className="mt-3">
                  <FiClock size="13px" />
                  {"  "}
                </span>
                <span className="mt-3">
                  <time dateTime={story.published_date}>
                    {moment(story.published_date).fromNow()}
                  </time>
                </span>
              </p>
            </div>
            <div className="col-auto">
              <span>
                <span className="badge badge-soft-primary">
                  <b className="m-1">{story.section}</b>
                </span>
              </span>
            </div>
          </div>
        </div>
        <p className="mb-3">{story.abstract}</p>
        <p className="text-center mb-3">
          {story.multimedia && (
            <img
              src={story.multimedia[0].url}
              alt="..."
              className="img-fluid rounded"
            />
          )}
        </p>
        <div className="mb-3">
          <div className="row">
            <div className="col">
              {story.des_facet.map((text: string, i: number) => (
                <Link
                  to={`/search/?query=${text}`}
                  key={i}
                  className="btn btn-sm btn-white m-1"
                >
                  {text}
                </Link>
              ))}
            </div>
            <div className="col-auto mr-n3"></div>
            <div className="col-auto">
              <a
                about="blank"
                href={story.url}
                className="btn btn-sm btn-dark m-1"
              >
                <FiExternalLink size="11px" />
                {"  NY Times"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
