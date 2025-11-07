import { useCallback, useContext, useMemo, useState } from "react";
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
  deleteProductInDatabase,
  getAllProductsDataFromChangedParameter,
} from "../../api/ProductApi";
import ReUsableForm from "../../Components/ReUsableForm/ReUsableForm";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { debounce } from "../../utils/debounce";
import { userContext } from "../../Context/UserContext";

const ProductsPage = () => {
  const [allProductsData, setAllProductsData] = useState([]);
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

  const [editProductData, setEditProductData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useContext(userContext);
  const { showMessage } = useSnackbar();

  const getAllProductsDataFromChangedParameters = useCallback(
    async (page, limit, filter, sort, search) => {
      setIsLoading(true);
      try {
        const res = await getAllProductsDataFromChangedParameter(
          page,
          limit,
          filter,
          sort,
          search
        );

        setAllProductsData(res.data.allProductsData);
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
    getAllProductsDataFromChangedParameters(
      currentPage,
      limit,
      filter,
      sort,
      searchText
    );
  }, [currentPage, limit, filter, sort]);

  const data = {
    allProductsData,
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
    setAllProductsData,
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
      getAllProductsDataFromChangedParameters(1, limit, filter, sort, value);
    },
    [limit, filter, sort, getAllProductsDataFromChangedParameters]
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
    // getAllProductsDataFromChangedParameters(1, limit, filter, sort, searchText);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
    // getAllProductsDataFromChangedParameters(1, limit, filter, sort, searchText);
  };

  const handleResetFilter = async () => {
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
      await getAllProductsDataFromChangedParameters(
        ogCurrentPage,
        limit,
        ogFilter,
        ogSort,
        ogSearchText
      );
    }
    // setCurrentPage(1);
  };

  const DeleteProductRcord = async (productId) => {
    setIsLoading(true);
    try {
      const resObj = await deleteProductInDatabase(productId);

      showMessage(resObj.data.message, "success");
      if (data.finalData.length === 1 && data.currentPage === data.totalPages) {
        await getAllProductsDataFromChangedParameters(
          currentPage - 1,
          limit,
          filter,
          sort,
          searchText
        );
      } else {
        await getAllProductsDataFromChangedParameters(
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
  const handleDeleteRecord = (productId) => {
    DeleteProductRcord(productId);
  };

  const EditProductRecord = (productData) => {
    setForm("EditProduct");
    setEditProductData(productData);
    setOpenModal(true);
  };

  const handleEditRecord = (productData) => {
    EditProductRecord(productData);
  };

  const handleAddProduct = () => {
    setForm("AddProduct");
    setOpenModal(true);
  };

  return (
    <div>
      <h1>Products</h1>
      {userData.role === "admin" && (
        <Box sx={{ marginBottom: "16px" }}>
          <Button variant="contained" onClick={handleAddProduct}>
            <AddIcon />
            AddProduct
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
          mx: "5px",
          flexWrap: "wrap",
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
            placeholder="Search By Name"
            variant="standard"
            value={searchText}
            onChange={handleSearchTextChange}
            // ref={searchFieldRef}
          />
        </Box>

        {/* Filter bY category............ */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <p>Role:</p> */}
          <label htmlFor="input-select">Category:</label>
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
              <MenuItem value={"electronics"}>Electronics</MenuItem>
              <MenuItem value={"cloths"}>Cloths</MenuItem>
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
            type="Product"
          />
          <BasicModal
            open={openModal}
            handleOpen={handleOpenModal}
            handleClose={handleCloseModal}
            form={form}
          >
            <ReUsableForm
              form={form}
              editData={editProductData}
              closeModal={handleCloseModal}
              tableData={data}
              setTableDataFunctions={setData}
              refreshtable={getAllProductsDataFromChangedParameters}
            />
          </BasicModal>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
