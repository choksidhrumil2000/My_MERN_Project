import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import TablePaginationActions from "@mui/material/TablePaginationActions";
import Pagination from "@mui/material/Pagination";

const TableComponent = ({ data, setData }) => {
  const handleChangePage = (event, newPage) => {
    console.log(newPage, data.totalPages);
    if (newPage < 1) {
      newPage = 1;
      // setData.setCurrentPage(1);
      return;
    }
    if (newPage > data.totalPages) {
      newPage = data.totalPages;
      // setData.setCurrentPage(data.totalPages);
      return;
    }
    setData.setCurrentPage(newPage);
  };
  const handleDeleteUser = (userId) => {
    
  };

  const handleEditUser = () => {};

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: "1000px",
            "@media (max-width: 600px)": {
              minWidth: "700px",
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
                    onClick={()=> handleEditUser(row._id) }
                    sx={{ marginRight: "10px" }}
                  />
                  <DeleteIcon
                    onClick={()=> handleDeleteUser(row._id) }
                    sx={{ marginTop: "10px" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data.allUsersData.length}
                rowsPerPage={data.limit}
                page={data.currentPage}
                totalPages={data.totalPages}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              /> */}

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
