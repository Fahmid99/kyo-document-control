import React, { useState, useRef, useCallback } from "react";
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
import HeightIcon from '@mui/icons-material/Height';

const DropDownFilter = React.memo(({
  filterObj,
  handleFilterChange,
  filterQuery,
  setFilterQuery,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState(filterQuery[filterObj.keyName] || []);
  const [listHeight, setListHeight] = useState(200);
  const [isResizing, setIsResizing] = useState(false);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    const updatedQuery = { ...filterQuery };
    delete updatedQuery[filterObj.keyName];
    setSelectedTags([]);
    setFilterQuery(updatedQuery);
    handleFilterChange(updatedQuery);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleToggle = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      const tagsIncluded = prevSelectedTags.includes(tag);
      const updatedTags = tagsIncluded
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag];

      const updatedQuery = { ...filterQuery, [filterObj.keyName]: updatedTags };
      if (updatedTags.length === 0) {
        delete updatedQuery[filterObj.keyName];
      }
      setFilterQuery(updatedQuery);
      handleFilterChange(updatedQuery);

      return updatedTags;
    });
  };

  // Resize functionality
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const startY = e.clientY;
    const startHeight = listHeight;
    setIsResizing(true);

    const handleMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const newHeight = Math.max(200, startHeight + deltaY);
      setListHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove, { capture: true });
      document.removeEventListener('mouseup', handleMouseUp, { capture: true });
    };

    document.addEventListener('mousemove', handleMouseMove, { capture: true });
    document.addEventListener('mouseup', handleMouseUp, { capture: true });
  }, [listHeight]);



  const filteredTags = filterObj.data.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTags = [...filteredTags].sort((a, b) => a.localeCompare(b));
  const sortedAndSelectedTags = [
    ...selectedTags.filter((tag) => sortedTags.includes(tag)),
    ...sortedTags.filter((tag) => !selectedTags.includes(tag)),
  ];

  const listStyle = {
    maxHeight: listHeight,
    overflow: "auto",
    borderRadius: "4px",
    padding: "8px",
    width: "500px",
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          background: "#6e3cbe",
          fontWeight: "bold",
          boxShadow: "1px 2px 3px 2px rgba(0, 0, 0, 0.1)",
          color: "white",
          borderRadius: "10px",
          "&:hover": {
            background: "#4a148c",
          },
          margin: "5px",
        }}
      >
        {filterObj.name === "Categories" ? (
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
        <Box sx={{ p: 2, position: 'relative' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
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

          <Box sx={{ position: 'relative' }}>
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
            
            {/* Resize Handle */}
            <Box
              onMouseDown={handleMouseDown}
              sx={{
                position: 'absolute',
                bottom: -5,
                left: '50%',
                transform: 'translateX(-50%)',
                width: "100%",
                height: 20,
                cursor: 'ns-resize',
                backgroundColor: '#e0e0e0',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                '&:hover': {
                  backgroundColor: '#6e3cbe',
                  '& .height-icon': {
                    color: 'white',
                  },
                },
                userSelect: 'none',
                '-webkit-user-select': 'none',
                '-moz-user-select': 'none',
                '-ms-user-select': 'none',
                '&::selection': {
                  background: 'transparent',
                },
              }}
            >
              <HeightIcon 
                className="height-icon"
                sx={{ 
                  fontSize: '16px', 
                  color: '#999',
                  transition: 'color 0.2s ease',
                  pointerEvents: 'none',
                }} 
              />
            </Box>
          </Box>

          <Button onClick={handleClose} sx={{ mt: 3, color: "#6e3cbe" }}>
            Close
          </Button>
        </Box>
      </Menu>
    </div>
  );
});

export default DropDownFilter;