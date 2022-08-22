import axios from "axios";
import { useState, useEffect } from "react";

export const DataProvider = () => {
  const [userData, setUserData] = useState([]);
  const [editModal, setEditModal] = useState({
    id: 0,
    name: "",
    email: "",
    role: "",
  });
  const [userCheck, setUserCheck] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const userPerPage = 10;

  // users per page
  let indexofLastUser = currentPage * userPerPage;
  let indexofFirstUser = indexofLastUser - userPerPage;
  let currentUser = searchData.slice(indexofFirstUser, indexofLastUser);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // delete user
  const deleteHandler = (userId) => {
    const filteredData = searchData.filter((user) => user.id !== userId);
    setSearchData(filteredData);
  };

  // edit user
  const editHandler = (userId) => {
    setShowEditModal(true);
    const user = searchData.find((user) => user.id === userId);
    setEditModal({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  // submit edit form
  const submitEditForm = (e) => {
    e.preventDefault();
    const newUserData = searchData.map((user) =>
      user.id === editModal.id ? { ...editModal } : user
    );
    setSearchData(newUserData);
    setShowEditModal(false);
  };

  // search handler
  const searchHandler = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const users = userData.filter(
      (item) =>
        item.name.includes(searchValue) ||
        item.email.includes(searchValue) ||
        item.role.includes(searchValue)
    );
    setSearchData(users);
  };

  // check handler
  const checkHandler = (e, userId) => {
    if (e.target.checked === true) {
      setUserCheck((p) => [...p, userId]);
    } else {
      const user = userCheck.filter((user) => user !== userId);
      setUserCheck(user);
    }
  };

  // delete selected handler
  const deleteSelectedHandler = () => {
    const leftUser = searchData.filter(
      (item) => !userCheck.find((item1) => item1 === item.id)
    );
    setSearchData(leftUser);
    setUserCheck([]);
  };

  // select current page users
  const selectCurrentPageUser = (e) => {
    if (e.target.checked === false) {
      setUserCheck([]);
    } else {
      const userCheck = currentUser.map((user) => user.id);
      setUserCheck(userCheck);
    }
  };

  // selected user
  const isSelected = (userId) => {
    const isPresent = userCheck.includes(userId);
    return isPresent;
  };

  // check if all users selected in current page
  const isAllSelected = () => {
    const isSelected = currentUser.map((item) => userCheck.includes(item.id));
    for (let i = 0; i < isSelected.length; i++) {
      if (isSelected[i] === false) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const userData = response.data;
      setUserData(userData);
      setSearchData(userData);
    })();
  }, []);

  return {
    showEditModal,
    submitEditForm,
    editModal,
    search,
    searchData,
    searchHandler,
    selectCurrentPageUser,
    isAllSelected,
    isSelected,
    setEditModal,
    userCheck,
    currentUser,
    deleteHandler,
    editHandler,
    checkHandler,
    userPerPage,
    paginate,
    deleteSelectedHandler,
  };
};
