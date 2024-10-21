import React from "react";
import { Autocomplete, TextField, Box, Chip} from "@mui/material";

const FilterDropdown = ({ options, label, value, onChange }) => {
  return (
      <Autocomplete
        options={options}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3f51b5",
                },
              },
            }}
          />
        )}
        sx={{ mb: 2,mt:2 }}
        noOptionsText="No options available"
        getOptionLabel={(option) => option.toString()}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option}>
            <Chip label={option} variant="filled" size="small" />
          </Box>
        )}
        clearOnBlur={true}
        disableClearable={false}
      />
  );
};

export default FilterDropdown;
