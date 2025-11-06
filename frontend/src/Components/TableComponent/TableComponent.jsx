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
  const handleDeleteUser = (userId) => {
    handleDeleteRecord(userId);
  };

  const handleEditUser = (userData) => {
    handleEditRecord(userData);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: "650px",
            "@media (max-width: 763px)": {
              minWidth: "763px",
            },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Sr.No.</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.finalData.map((row, i) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.startingIndex + i + 1}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">
                  <EditIcon
                    onClick={() => handleEditUser(row)}
                    sx={{ marginRight: "10px", cursor: "pointer" }}
                  />
                  {userData.email !== row.email && (
                    <DeleteIcon
                      onClick={() => handleDeleteUser(row._id)}
                      sx={{ marginTop: "10px", cursor: "pointer" }}
                    />
                  )}
                </TableCell>
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
