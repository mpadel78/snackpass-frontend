import { AppBar, Toolbar } from "@material-ui/core";

import React from "react";

export default function Header() {
  return (
    <header>
      <AppBar style={{ backgroundColor: "#00c8f7", position: "center" }}>
        <Toolbar style={{ justifyContent: "center", fontSize: "30px" }}>
          Snackpass popular items
        </Toolbar>
      </AppBar>
    </header>
  );
}
