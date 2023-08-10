import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const colors = ["indigo", "green", "yellow", "red", "orange", "pink", "blue"];

export default function EventModel() {
  const { setShowEventModel, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    selectedEvent
      ? colors.find((color) => color === selectedEvent.color)
      : colors[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      color: selectedColor,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({
        type: "UPDATE_EVENT",
        payload: calendarEvent,
      });
    } else {
      dispatchCalEvent({
        type: "ADD_EVENT",
        payload: calendarEvent,
      });
    }
    setShowEventModel(false);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form
        className="commentForm bg-white rounded-lg w-96"
        onSubmit={handleSubmit}
        onKeyPress={handleKeyPress}
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "DELETE_EVENT",
                    payload: selectedEvent,
                  });
                  setShowEventModel(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModel(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 ml-9 border-0 text-gray-600 font-semibold pb-2 w-11/12 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <span className="align-middle material-icons-outlined text-gray-400">
                schedule
              </span>
              <p className="align-middle px-2 inline text-gray-400">
                {daySelected.format("dddd, MMMM DD")}
              </p>
            </div>
            <div className="inline-block">
              <span className="align-middle pr-1 material-icons-outlined text-gray-400">
                segment
              </span>
              <input
                type="text"
                name="description"
                placeholder="Add description"
                value={description}
                className="inline align-middle pt-3 border-0 text-gray-600 pb-2 border-b-2 w-11/12 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex">
              <span className="align-middle flex material-icons-outlined text-gray-400 pr-3">
                bookmark_border
              </span>
              <div className="align-middle flex gap-x-2">
                {colors.map((col, i) => (
                  <span
                    onClick={() => setSelectedColor(col)}
                    key={i}
                    className={`bg-${col}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedColor === col && (
                      <span className="material-icons-outlined text-white text-sm">
                        check
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-end w-100 border-t p-3 mt-5">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Create
          </button>
        </footer>
      </form>
    </div>
  );
}
