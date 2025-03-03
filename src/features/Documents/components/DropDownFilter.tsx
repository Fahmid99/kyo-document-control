import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Menu,
  TextField,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Close } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import TagsIcon from "@mui/icons-material/LocalOffer";

const listStyle = {
  maxHeight: 200,
  overflow: "auto",
  borderRadius: "4px",
  padding: "8px",
  width: "500px",
};

export default function DropDownFilter({
  filterObj,
  handleFilterChange,
  filterQuery,
  setfilterQuery,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const tags = filterObj?.data || [];

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleClear = (e) => {
    e.stopPropagation();
    const updatedQuery = { ...filterQuery };
    delete updatedQuery[filterObj.keyName];
    setSelectedTags([]);
    setfilterQuery(updatedQuery);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleToggle = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      const tagsIncluded = prevSelectedTags.includes(tag);
      return tagsIncluded
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag];
    });

    setfilterQuery((prevQuery) => {
      const updatedQuery = { ...prevQuery };

      if (!selectedTags.includes(tag)) {
        if (!updatedQuery[filterObj.keyName]) {
          updatedQuery[filterObj.keyName] = [tag];
        } else {
          updatedQuery[filterObj.keyName].push(tag);
        }
      } else {
        updatedQuery[filterObj.keyName] = updatedQuery[
          filterObj.keyName
        ].filter((t) => t !== tag);
      }

      if (updatedQuery[filterObj.keyName].length === 0) {
        delete updatedQuery[filterObj.keyName];
      }

      return updatedQuery;
    });
  };

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTags = [...filteredTags].sort((a, b) => a.localeCompare(b));
  const sortedAndSelectedTags = [
    ...selectedTags.filter((tag) => sortedTags.includes(tag)),
    ...sortedTags.filter((tag) => !selectedTags.includes(tag)),
  ];

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          background: "#6e3cbe",
          boxShadow: "1px 2px 3px 2px rgba(0, 0, 0, 0.1)",
          color: "white",
          borderRadius: "10px",
          "&:hover": {
            background: "#4a148c",
          },
          margin: "5px",
        }}
      >
        {filterObj.name == "Categories" ? (
          <CategoryIcon sx={{ margin: "0.1em" }} />
        ) : (
          <TagsIcon sx={{ margin: "0.1em" }} />
        )}
        <Typography sx={{ fontSize: "14px", padding: "2px" }}>
          {filterObj.name}
        </Typography>
        {selectedTags.length > 0 && (
          <Box
            component="span"
            onClick={handleClear}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0 6px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
              marginLeft: "5px",
              cursor: "pointer",
              "&:hover": {
                background: "#7c4dff",
              },
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
              {selectedTags.length} Selected
            </Typography>
            <Close sx={{ fontSize: "18px", color: "white" }} />
          </Box>
        )}
        <ArrowDropDownIcon sx={{ fontSize: "18px" }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          fontFamily: "manrope",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="h2">
              {filterObj.name}
            </Typography>
            <Button onClick={handleClear} sx={{ color: "#6e3cbe" }}>
              Clear
            </Button>
          </Box>
          <TextField
            id="search-tags"
            placeholder={`Search ${filterObj.name}`}
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              background: "#F6F6F7",
              borderRadius: "10px",
              "& fieldset": { border: "none" },
            }}
          />

          <List sx={listStyle}>
            {sortedAndSelectedTags.map((tag) => (
              <ListItem
                key={tag}
                button
                onClick={() => handleToggle(tag)}
                sx={{
                  backgroundColor: selectedTags.includes(tag)
                    ? "#d1c4e9"
                    : "inherit",
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: "10px",
                  margin: "5px",
                  width: "95%",
                }}
              >
                <div
                  style={{
                    background: "white",
                    border: "1px solid #F6F6F7",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText
                    primary={tag}
                    sx={{
                      fontSize: "1em",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                    disableTypography
                  />
                </div>
                {selectedTags.includes(tag) && (
                  <CheckIcon sx={{ color: "#6e3cbe" }} />
                )}
              </ListItem>
            ))}
          </List>
          <Button onClick={handleClose} sx={{ mt: 2, color: "#6e3cbe" }}>
            Close
          </Button>
        </Box>
      </Menu>
    </div>
  );
}
