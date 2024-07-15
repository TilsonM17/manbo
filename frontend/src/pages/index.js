import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Column from "@/components/Column/Column";
import axios from "axios";

const INITIAL_COLUMN_ORDER = ["Pending", "In Progress", "Testing", "Done"];

export default function Home() {
  const [columnsOrder, setColumnsOrder] = useState([]);
  const [data, setData] = useState({});
  const [winReady, setWinReady] = useState(false);
  const [items, setItems] = useState({});

  useEffect(() => {
    setWinReady(true);
    fetchTasks();
  }, []);

  function capitalizeFirstLetter(str) {
    if (!str) return str;

    const hasUnderscores = str.includes("_");

    if (hasUnderscores) {
      str = str.replace(/_/g, " ");
    }

    const words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i]) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
      }
    }
    str = words.join(" ");

    return str;
  }

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/tasks`);
      const tasks = response.data;

      const columnsData = INITIAL_COLUMN_ORDER.reduce((acc, status) => {
        acc[status] = {
          id: status.toLowerCase().replace(" ", "_"),
          title: status,
          itemsOrder: [],
        };
        return acc;
      }, {});

      const itemsData = {};

      tasks.forEach((task) => {
        itemsData[task._id] = {
          id: task._id,
          title: task.title,
          description: task.description,
        };
        columnsData[capitalizeFirstLetter(task.status)].itemsOrder.push(
          task._id
        );
      });

      setData(columnsData);
      setItems(itemsData);
      setColumnsOrder(INITIAL_COLUMN_ORDER);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (title, description, status) => {
    try {
       await axios.post(`http://localhost:8082/api/tasks`, {
        title,
        description,
        status,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const editTask = async (taskId, title, description, newStatus) => {
    try {
      await axios.put(`http://localhost:8082/api/tasks/${taskId}`, {
        title: title,
        description: description,
        status: newStatus,
      });

      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8082/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:8082/api/tasks/${taskId}`, {
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (type === "DEFAULT") {
      function getItemById(data, searchId) {
        for (const key in data) {
          if (data[key].id === searchId) {
            return data[key];
          }
        }
        return null;
      }

      const sourceColumnId = source.droppableId;
      const destColumnId = destination.droppableId;

      const sourceItemsCollection = getItemById(data, sourceColumnId);
      const destItemsCollection = getItemById(data, destColumnId);

      const newSourceItemsCollection = [...sourceItemsCollection.itemsOrder];
      const newDestItemsCollection = [...destItemsCollection.itemsOrder];

      const [deleted_item_id] = newSourceItemsCollection.splice(sourceIndex, 1);
      newDestItemsCollection.splice(destinationIndex, 0, deleted_item_id);

      const new_data = { ...data };

      new_data[getItemById(data, sourceColumnId).title].itemsOrder =
        newSourceItemsCollection;
      new_data[getItemById(data, destColumnId).title].itemsOrder =
        newDestItemsCollection;

      setData(new_data);

      if (sourceColumnId !== destColumnId) {
        updateTaskStatus(deleted_item_id, destColumnId);
      }
    }
  };

  if (columnsOrder.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full w-full items-center flex-col">
      <p className="font-bold text-4xl bg-gradient-to-r from-purple-600 via-blue-400 to-indigo-400 mt-10 text-transparent bg-clip-text">
        Mambo Kamban
      </p>
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="COLUMN" direction="HORIZONTAL">
          {(provided) => (
            <div
              className="flex items-center w-full md:max-w-10xl justify-center min-h-96 py-4 mt-6 rounded-md overflow-x-scroll md:overflow-hidden"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnsOrder.map((colId, index) => {
                const columnData = data[colId];

                return (
                  <Draggable
                    draggableId={columnData.id}
                    key={columnData.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="rounded-md border flex flex-col max-w-xs mx-3"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between w-80 gap-2 hover:bg-gray-600 p-4 border-b border-b-gray-700 rounded-t-md"
                        >
                          <p className="text-xl font-bold">{colId}</p>
                        </div>

                        {winReady ? (
                          <Column
                            {...columnData}
                            ITEMS={items}
                            deleteTask={deleteTask}
                            addTask={addTask}
                            editTask={editTask}
                          />
                        ) : null}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
