import { useState, useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import Column from "@/components/Column/Column";

const INITIAL_COLUMN_ORDER = ["Pending", "In Progress", "Testing", "Done"];

const INITIAL_COL_DATA = {
  Pending: {
    id: "pending",
    title: "Pending",
    itemsOrder: ["item-1", "item-2", "item-3"],
  },
  "In Progress": {
    id: "in_progress",
    title: "In Progress",
    itemsOrder: ["item-4", "item-5"],
  },
  "Testing": {
    id: "testing",
    title: "Testing",
    itemsOrder: ["item-6", "item-7", "item-8"],
  },

  "Done": {
    id: "done",
    title: "Done",
    itemsOrder: [],
  },
};

const ITEMS = {
  "item-1": {
    id: "item-1",
    title: "Item 1",
  },
  "item-2": {
    id: "item-2",
    title: "Item 2",
  },
  "item-3": {
    id: "item-3",
    title: "Item 3",
  },
  "item-4": {
    id: "item-4",
    title: "Item 4",
  },
  "item-5": {
    id: "item-5",
    title: "Item 5",
  },
  "item-6": {
    id: "item-6",
    title: "Item 6",
  },
  "item-7": {
    id: "item-7",
    title: "Item 7",
  },
  "item-8": {
    id: "item-8",
    title: "Item 8",
  },
};

export default function Home() {
  const [columnsOrder] = useState(INITIAL_COLUMN_ORDER);
  const [data, setData] = useState(INITIAL_COL_DATA);
  const [winReady, setwinReady] = useState(false);
  
  useEffect(() => {
    setwinReady(true);
  }, []);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) 
      return;

    if (source.droppableId === destination.droppableId && source.index === destination.index)
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

        const sourceCollumId = source.droppableId;
        const destineCollumId = destination.droppableId;

        const sourceItemsCollection = getItemById(data, sourceCollumId)
        const destItemsCollection = getItemById(data, destineCollumId)

        const newSourceItemsCollection = [...sourceItemsCollection.itemsOrder];
        const newDestItemsCollection   = [...destItemsCollection.itemsOrder];
        
        const [deleted_item_id] = newSourceItemsCollection.splice(sourceIndex,1);
        newDestItemsCollection.splice(destinationIndex, 0, deleted_item_id);

        const new_data = { ...data };
        
        new_data[getItemById(data, sourceCollumId).title].itemsOrder = newSourceItemsCollection;
        new_data[getItemById(data, destineCollumId).title].itemsOrder = newDestItemsCollection;

        setData(new_data);
    }
  };

  return (
    <div className="flex h-full w-full items-center  flex-col">
      <p className="font-bold text-4xl bg-gradient-to-r from-purple-600 via-blue-400 to-indigo-400  mt-10 text-transparent bg-clip-text">
        Mambo Kamban
      </p>
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="COLUMN" direction="HORIZONTAL">
          {(provided) => (
            <div
              className="flex  items-center w-full md:max-w-10xl justify-center border min-h-96 py-4 mt-6 rounded-md overflow-x-scroll md:overflow-hidden"
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
                          <p className="text-xl font-bold">
                            {columnData.title}
                          </p>
                        </div>

                        {winReady ? (
                          <Column {...columnData} ITEMS={ITEMS} />
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
