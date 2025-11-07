import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TableFooter from "@mui/material/TableFooter";
import Pagination from "@mui/material/Pagination";
import { useContext } from "react";
import { userContext } from "../../Context/UserContext";

const TableComponent = ({
  data,
  setData,
  handleDeleteRecord,
  handleEditRecord,
  type,
}) => {
  const { userData } = useContext(userContext);
  const handleChangePage = (event, newPage) => {
    if (newPage < 1) {
      newPage = 1;
      return;
    }
    if (newPage > data.totalPages) {
      newPage = data.totalPages;
      return;
    }
    setData.setCurrentPage(newPage);
  };
  const handleDelete = (Id) => {
    handleDeleteRecord(Id);
  };

  const handleEdit = (data) => {
    handleEditRecord(data);
  };

  const generateHeader = (typeOfTable) => {
    switch (typeOfTable) {
      case "User":
        return ["Sr.No", "Name", "Email", "Role", "Actions"];
      case "Product":
        return ["Sr.No", "Name", "Price", "Category", "Actions"];
      default:
        return;
    }
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          display: "block",
        }}
      >
        <Table
          sx={{
            minWidth: "750px",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {generateHeader(type).map((item) => {
                if (item === "Actions" && userData.role !== "admin")
                  return null;
                return (
                  <TableCell key={item} align="right">
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.finalData.map((row, i) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {data.startingIndex + i + 1}
                </TableCell>
                {generateHeader(type).map((item, i, arr) => {
                  if (i !== 0 && i !== arr.length - 1) {
                    return (
                      <TableCell key={item.toLowerCase()} align="right">
                        {row[item.toLowerCase()]}
                      </TableCell>
                    );
                  }
                })}
                {userData.role === "admin" && (
                  <TableCell align="right">
                    {userData.email !== row.email && (
                      <EditIcon
                        onClick={() => handleEdit(row)}
                        sx={{ marginRight: "10px", cursor: "pointer" }}
                      />
                    )}
                    {userData.email !== row.email && (
                      <DeleteIcon
                        onClick={() => handleDelete(row._id)}
                        sx={{ marginTop: "10px", cursor: "pointer" }}
                      />
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <Pagination
                  count={data.totalPages}
                  page={data.currentPage}
                  onChange={handleChangePage}
                  color="primary"
                  shape="rounded"
                  size="medium"
                  showFirstButton
                  showLastButton
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
