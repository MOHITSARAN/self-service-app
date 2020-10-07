import React from "react";
import { CircularProgress } from "@material-ui/core";

export default function Loader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}
