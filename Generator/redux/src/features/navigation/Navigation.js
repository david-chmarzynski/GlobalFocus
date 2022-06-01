import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";

// REACT ROUTER
import { Link, useLocation } from "react-router-dom";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    cursor: "pointer",
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.5),
    },
  };
});

export default function CustomizedBreadcrumbs() {
  let path = useLocation().pathname;

  return (
    <div className="navigation" role="navigation">
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "1rem",
          marginTop: "3rem",
        }}
      >
        <Link to="/">
          <StyledBreadcrumb
            label="Formulaire"
            sx={{ backgroundColor: path === "/" && "#a6a6a6" }}
          />
        </Link>
        <Link to="/modules">
          <StyledBreadcrumb
            label="Module"
            sx={{ backgroundColor: path === "/modules" && "#a6a6a6" }}
          />
        </Link>
        <Link to="/tags">
          <StyledBreadcrumb
            label="Tags"
            sx={{ backgroundColor: path === "/tags" && "#a6a6a6" }}
          />
        </Link>
        <Link to="/questions">
          <StyledBreadcrumb
            label="Questions"
            sx={{ backgroundColor: path === "/questions" && "#a6a6a6" }}
          />
        </Link>
        <Link to="/answers">
          <StyledBreadcrumb
            label="Answers"
            sx={{ backgroundColor: path === "/answers" && "#a6a6a6" }}
          />
        </Link>
      </Breadcrumbs>
    </div>
  );
}
