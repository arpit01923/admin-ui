import { EditModal } from "../../components";
import { List } from "../../components/list/list";
import { Pagination } from "../../components/pagination/pagination";
import { DataProvider } from "../../custom-hook/data-provider";
import "./home.css";

export const Home = () => {
  const {
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
  } = DataProvider();

  return (
    <section>
      {showEditModal && (
        <EditModal
          submitEditForm={submitEditForm}
          editModal={editModal}
          setEditModal={setEditModal}
        />
      )}

      <input
        type="text"
        placeholder="Search by name, email or role"
        className="searchbar"
        value={search}
        onChange={(e) => searchHandler(e)}
      />
      <header className="header">
        <input
          type="checkbox"
          checked={userCheck.length && isAllSelected()}
          onChange={(e) => selectCurrentPageUser(e)}
        />
        <p>Name</p>
        <p>Email</p>
        <p>Role</p>
        <p>Actions</p>
      </header>
      <div className="divider"></div>

      <ul className="list">
        <List
          userData={currentUser}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
          checkHandler={checkHandler}
          isSelected={isSelected}
        />
      </ul>

      <footer className="footer">
        <button onClick={() => deleteSelectedHandler()}>Delete selected</button>
        <Pagination
          userPerPage={userPerPage}
          totalUser={searchData.length}
          paginate={paginate}
        />
      </footer>
    </section>
  );
};
