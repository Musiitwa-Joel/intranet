import { css } from "@linaria/core";

const cellExpandClassname = css`
  block-size: 100%;
  align-content: center;
  text-align: center;
  cursor: pointer;
`;

export function CellExpanderFormatter({ tabIndex, expanded, onCellExpand }) {
  function handleKeyDown(e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onCellExpand();
    }
  }

  return (
    <div
      className={cellExpandClassname}
      onClick={onCellExpand}
      onKeyDown={handleKeyDown}
    >
      <span tabIndex={tabIndex}>{expanded ? "\u25BC" : "\u25B6"}</span>
    </div>
  );
}
