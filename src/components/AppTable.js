import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const AppTable = ({ columns, data, onView, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 1 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#512da8" }}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "2px solid #D1C4E9",
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.id}
              hover
              sx={{
                backgroundColor: index % 2 === 0 ? "#f3e5f5" : "#fff",
                "&:hover": {
                  backgroundColor: "#e1bee7",
                },
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    fontSize: "14px",
                    padding: "12px",
                    borderBottom: "1px solid #d3d3d3",
                    color: "#5e35b1",
                  }}
                >
                  {column.id === "action" ? (
                    <>
                      <IconButton
                        sx={{ color: "#512da8", marginRight: 1 }}
                        onClick={() => onView(row)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        sx={{ color: "#512da8", marginRight: 1 }}
                        onClick={() => onEdit(row)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        sx={{ color: "red" }}
                        onClick={() => onDelete(row)}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  ) : (
                    row[column.id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppTable;
