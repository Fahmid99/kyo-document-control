import { Box, Button, TextField } from "@mui/material";

function Filters() {
  return (
    <div>
      {" "}
      <Box marginBottom={"1em"} width={"100%"} display={"flex"}>
        <Button
          variant="contained"
          sx={{ background: "#0A9BCD", marginRight: "1em" }}
        >
          Categories
        </Button>
        <Button
          variant="contained"
          sx={{ background: "#0A9BCD", marginRight: "1em" }}
        >
          Tags
        </Button>
        <Button
          variant="contained"
          sx={{ background: "#0A9BCD", marginRight: "1em" }}
        >
          Policy Type
        </Button>
        <TextField label="search all" sx={{ marginLeft: "auto" }} />
      </Box>
    </div>
  );
}

export default Filters;
