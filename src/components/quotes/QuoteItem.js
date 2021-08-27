import classes from "./QuoteItem.module.css";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const QuoteItem = (props) => {
  const [animate, setAnimate] = useState(false);

  const liClasses = `${classes.item} ${animate ? classes.click : ""}`;

  const { isSortingAscending } = props;

  //modific intarzierea pt inlaturarea clasei in functie de cat delay am pe fiecare componenta
  const delay = 200 + props.delay;

  useEffect(() => {
    console.log("isSortingAscending changed");
    setAnimate(true);
    const timerId = setTimeout(() => {
      setAnimate(false);
    }, delay);

    return () => clearTimeout(timerId);
  }, [isSortingAscending, delay]);

  return (
    // <li className={classes.item}>
    <li className={liClasses} style={{ animationDelay: `${props.delay}ms` }}>
      {/* <li className={liClasses}> */}
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link to={`/quotes/${props.id}`} className="btn">
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
