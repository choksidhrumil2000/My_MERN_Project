import { useCallback, useMemo, useState } from "react";
import TableComponent from "../../Components/TableComponent/TableComponent";
import { useEffect } from "react";
import { useSnackbar } from "../../Context/SnackBarContext";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Tooltip from "@mui/material/Tooltip";
import BasicModal from "../../Components/BasicModal/BasicModal";
import {
  deleteUserInDatabase,
  getAllUsersDataFromChangedParameter,
} from "../../api/userApi";
import ReUsableForm from "../../Components/ReUsableForm/ReUsableForm";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { debounce } from "../../utils/debounce";

const UsersPage = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [startingIndex, setStartingIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("asc");
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState("");

  //Modal Variables..............
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [editData, setEditData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { showMessage } = useSnackbar();

  const getAllUsersDataFromChangedParameters = useCallback(
    async (page, limit, filter, sort, search) => {
      setIsLoading(true);
      try {
        const res = await getAllUsersDataFromChangedParameter(
          page,
          limit,
          filter,
          sort,
          search
        );

        setAllUsersData(res.data.allUsersData);
        setFinalData(res.data.final_data);
        setStartingIndex(parseInt(res.data.startingIndex));
        setCurrentPage(parseInt(res.data.currentPage));
        setTotalPages(parseInt(res.data.totalPages));
      } catch (err) {
        showMessage(
          err.response?.data?.message || "Error fetching users",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    },
    // [showMessage]
    []
  );

  useEffect(() => {
    getAllUsersDataFromChangedParameters(
      currentPage,
      limit,
      filter,
      sort,
      searchText
    );
  }, [currentPage, limit, filter, sort]);

  const data = {
    allUsersData,
    finalData,
    startingIndex,
    totalPages,
    currentPage,
    form,
    searchText,
    filter,
    sort,
  };
  const setData = {
    setAllUsersData,
    setCurrentPage,
    setFinalData,
    setTotalPages,
    setStartingIndex,
    setForm,
    setSearchText,
    setFilter,
    setSort,
  };

  const handleSearch = useCallback(
    (value) => {
      setCurrentPage(1);
      getAllUsersDataFromChangedParameters(1, limit, filter, sort, value);
    },
    [limit, filter, sort, getAllUsersDataFromChangedParameters]
  );

  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 1000),
    [handleSearch]
  );

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
    // getAllUsersDataFromChangedParameters(1, limit, filter, sort, searchText);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
    // getAllUsersDataFromChangedParameters(1, limit, filter, sort, searchText);
  };

  const handleResetFilter = async () => {
    // setSearchText("");
    // setFilter("all");
    // setSort("asc");
    // setCurrentPage(1);
    // getAllUsersDataFromChangedParameters(1, limit, filter, sort, searchText);
    const ogSearchText = "";
    const ogFilter = "all";
    const ogSort = "asc";
    const ogCurrentPage = 1;
    setSearchText(ogSearchText);
    setFilter(ogFilter);
    setSort(ogSort);
    setCurrentPage(ogCurrentPage);
    if (
      ogFilter === filter &&
      ogSort === sort &&
      ogCurrentPage === currentPage
    ) {
      await getAllUsersDataFromChangedParameters(
        ogCurrentPage,
        limit,
        ogFilter,
        ogSort,
        ogSearchText
      );
    }
  };

  const DeleteUserRcord = async (userId) => {
    setIsLoading(true);
    try {
      const resObj = await deleteUserInDatabase(userId);

      showMessage(resObj.data.message, "success");
      if (data.finalData.length === 1 && data.currentPage === data.totalPages) {
        await getAllUsersDataFromChangedParameters(
          currentPage - 1,
          limit,
          filter,
          sort,
          searchText
        );
      } else {
        await getAllUsersDataFromChangedParameters(
          currentPage,
          limit,
          filter,
          sort,
          searchText
        );
      }
    } catch (err) {
      showMessage(
        err.response?.data?.message || "Error in Deleting Record!!",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteRecord = (userId) => {
    DeleteUserRcord(userId);
  };

  const EditUserRecord = (userData) => {
    setForm("EditUser");
    setEditData(userData);
    setOpenModal(true);
  };

  const handleEditRecord = (userData) => {
    EditUserRecord(userData);
  };

  const handleAddUser = () => {
    setForm("AddUser");
    setOpenModal(true);
  };

  return (
    <div>
      <h1>Users</h1>
      <Box sx={{ marginBottom: "16px" }}>
        <Button variant="contained" onClick={handleAddUser}>
          <AddIcon />
          AddUser
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
          flexWrap: "wrap",
          mx: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <SearchIcon
            sx={{
              color: "action.active",
              mr: 1,
              my: 0.5,
            }}
          />
          <TextField
            id="input-with-sx"
            placeholder="Search By Name or Email"
            variant="standard"
            value={searchText}
            onChange={handleSearchTextChange}
            // ref={searchFieldRef}
          />
        </Box>

        {/* Filter bY ROle............ */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <p>Role:</p> */}
          <label htmlFor="input-select">Role:</label>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              id="input-select"
              value={filter}
              onChange={handleFilterChange}
              fullWidth
              // disabled={!editProfileSection}
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"user"}>user</MenuItem>
              <MenuItem value={"admin"}>admin</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Sort BY............................. */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="input-select-sort">Sort:</label>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              id="input-select-sort"
              value={sort}
              onChange={handleSortChange}
              fullWidth
              // disabled={!editProfileSection}
            >
              <MenuItem value={"asc"}>Ascending</MenuItem>
              <MenuItem value={"desc"}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Reset Filters.................... */}
        <Tooltip title="Reset Filters" arrow>
          <RestartAltIcon
            sx={{ cursor: "pointer" }}
            onClick={handleResetFilter}
          />
        </Tooltip>
      </Box>
      {isLoading ? (
        <div
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <div> */}
          <CircularProgress />
          {/* </div> */}
        </div>
      ) : data.finalData.length === 0 ? (
        <div
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              width: "50%",
              padding: "20px",
              border: "1px Solid black",
            }}
          >
            No Data Found!!!
          </div>
        </div>
      ) : (
        <div>
          <TableComponent
            data={data}
            setData={setData}
            handleDeleteRecord={handleDeleteRecord}
            handleEditRecord={handleEditRecord}
            type="User"
          />

          <BasicModal
            open={openModal}
            handleOpen={handleOpenModal}
            handleClose={handleCloseModal}
            form={form}
          >
            <ReUsableForm
              form={form}
              editData={editData}
              closeModal={handleCloseModal}
              tableData={data}
              setTableDataFunctions={setData}
              refreshtable={getAllUsersDataFromChangedParameters}
            />
          </BasicModal>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
