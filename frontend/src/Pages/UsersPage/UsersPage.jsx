import { useState } from "react";
import TableComponent from "../../Components/TableComponent/TableComponent";
import { useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "../../Context/SnackBarContext";

const UsersPage = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [startingIndex, setStartingIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("asc");
  const [filter, setFilter] = useState("all");

  const { showMessage } = useSnackbar();

  useEffect(() => {
    const getAllUsersData = async () => {
      let resObj;
      try {
        resObj = await axios.get(process.env.REACT_APP_API_URL + `/user/`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("token")
            )}`,
          },
        });
      } catch (err) {
        showMessage(err.response.data.message, "error");
        return;
      }
      setAllUsersData(resObj.data.allUsersData);
      setFinalData(resObj.data.final_data);
      setStartingIndex(parseInt(resObj.data.startingIndex));
      setCurrentPage(parseInt(resObj.data.currentPage));
      setTotalPages(parseInt(resObj.data.totalPages));
    };

    getAllUsersData();
  }, []);

  useEffect(() => {
    const getAllUsersDataFromChangedParameter = async () => {
      let resObj;
      try {
        resObj = await axios.get(
          process.env.REACT_APP_API_URL +
            `/user/?page=${currentPage}&limit=${limit}&filter=${filter}&sort=${sort}&search=${searchText}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                sessionStorage.getItem("token")
              )}`,
            },
          }
        );
      } catch (err) {
        showMessage(err.response.data.message, "error");
        return;
      }
      setAllUsersData(resObj.data.allUsersData);
      setFinalData(resObj.data.final_data);
      setStartingIndex(parseInt(resObj.data.startingIndex));
      setCurrentPage(parseInt(resObj.data.currentPage));
      setTotalPages(parseInt(resObj.data.totalPages));
    };

    getAllUsersDataFromChangedParameter();
  }, [currentPage, limit, filter, searchText, sort]);

  const data = {
    allUsersData,
    finalData,
    startingIndex,
    totalPages,
    currentPage,
  };
  const setData = {
    setAllUsersData,
    setCurrentPage,
    setFinalData,
    setTotalPages,
    setStartingIndex,
  };
  console.log("UsersData", allUsersData);
  return (
    <div>
      <h1>Users</h1>
      <div>
        <TableComponent data={data} setData={setData} />
      </div>
    </div>
  );
};

export default UsersPage;
