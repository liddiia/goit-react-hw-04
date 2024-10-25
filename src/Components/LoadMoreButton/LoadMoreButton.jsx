import css from "./LoadMoreButton.module.css"

function LoadMoreButtonn({ onClick }) {
  return <button className={css.LoadMoreButtonn} onClick={onClick} type="button">Load more</button>;
}

export default LoadMoreButtonn;