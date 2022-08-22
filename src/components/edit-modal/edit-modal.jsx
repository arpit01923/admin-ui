import "./edit-modal.css";

export const EditModal = ({ editModal, submitEditForm, setEditModal }) => {
  return (
    <div className="edit-modal">
      <form
        action="edit"
        className="edit-form"
        onSubmit={(e) => submitEditForm(e)}
      >
        <label htmlFor="">Name</label>
        <input
          type="text"
          value={editModal.name}
          onChange={(e) =>
            setEditModal((p) => ({ ...p, name: e.target.value }))
          }
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          value={editModal.email}
          onChange={(e) =>
            setEditModal((p) => ({ ...p, email: e.target.value }))
          }
        />
        <label htmlFor="">Role</label>
        <input
          type="text"
          value={editModal.role}
          onChange={(e) =>
            setEditModal((p) => ({ ...p, role: e.target.value }))
          }
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
