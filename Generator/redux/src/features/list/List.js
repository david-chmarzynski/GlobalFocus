import React, { useState } from "react";
import "./List.css";

// MUI
import Backdrop from "@mui/material/Backdrop";
import DeleteIcon from "@mui/icons-material/Delete";

const List = ({ list, title }) => {
  // LOCAL STATE
  const [open, setOpen] = useState(false);

  return (
    <div className="list">
      <button className="list-button" onClick={() => setOpen(!open)}>
        +
      </button>
      {open && (
        <Backdrop
          open={open}
          onClick={() => setOpen(false)}
          sx={{ color: "#fff", zIndex: 2, marginTop: 0 }}
        >
          <div className="list-layer">
            <h2 className="list-title">{title}</h2>
            <div className="list-item-layer">
              {list &&
                list.map((item) => (
                  <p className="list-item" key={item.tagOID}>
                    {item.tagOID}
                    <DeleteIcon className="list-item-icon" />
                  </p>
                ))}
            </div>
          </div>
        </Backdrop>
      )}
    </div>
  );
};

export default List;
