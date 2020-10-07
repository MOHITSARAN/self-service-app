import React from "react";
import ErrorIcon from "@material-ui/icons/Error";

export default function Error() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <ErrorIcon />
    </div>
  );
}
