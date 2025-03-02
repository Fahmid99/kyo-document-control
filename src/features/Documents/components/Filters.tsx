import { Box, Button, TextField } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Filters() {
  return (
    <div>
      {" "}
      <Box marginBottom={"1em"} width={"100%"} display={"flex"}>
        <Button
          variant="contained"
          sx={{
            background: "#0A9BCD",
            marginRight: "1em",
            boxShadow: " 2px 4px 8px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CategoryIcon sx={{ paddingRight: "10px" }} /> Categories{" "}
          <KeyboardArrowDownIcon
            sx={{ marginLeft: "7px", marginTop: "0.1em" }}
          />
        </Button>
        <Button
          variant="contained"
          sx={{
            background: "#0A9BCD",
            marginRight: "1em",
            boxShadow: " 2px 4px 8px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <LocalOfferIcon sx={{ paddingRight: "10px" }} /> Functionsubfn
          <KeyboardArrowDownIcon
            sx={{ marginLeft: "7px", marginTop: "0.1em" }}
          />
        </Button>
        <Button
          variant="contained"
          sx={{
            background: "#0A9BCD",
            marginRight: "1em",
            boxShadow: " 2px 4px 8px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <ArticleIcon sx={{ paddingRight: "10px" }} /> Document Type{" "}
          <KeyboardArrowDownIcon
            sx={{ marginLeft: "7px", marginTop: "0.1em" }}
          />
        </Button>
        <TextField label="search all" sx={{ marginLeft: "auto" }} />
      </Box>
    </div>
  );
}

export default Filters;
