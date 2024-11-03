import React from "react";
import MUIRichTextEditor from "mui-rte";
import { Box } from "@mui/system";
import { lighten, darken, alpha } from "@mui/material/styles";
import { Button } from "@mui/material";

function ProgrammeDescription() {
  return (
    <div>
      <Box
        className="p-16 w-full rounded-16 mb-24 border"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? lighten(theme.palette.background.default, 0.5)
              : lighten(theme.palette.background.default, 0.02),
          height: "calc(100vh - 250px)",

          overflow: "auto",
        }}
      >
        <MUIRichTextEditor label="Type Something here..." />
      </Box>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </div>
    </div>
  );
}

export default ProgrammeDescription;
