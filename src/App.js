import { useState } from "react";
import "./index.css";
import { Stats } from "./components/Stats";
import { NoteItems } from "./components/NoteItems";
import { Form } from "./components/Form";
import { Title } from "./components/Title";

export default function App() {
  const [items, setItems] = useState([]);

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handlePackedItems() {
    const updatedItems = items.map((item) => {
      if (item.packed) {
        return item;
      }
      return {
        ...item,
        packed: true,
      };
    });

    setItems(updatedItems);
  }

  function handleUnpackedItems() {
    const updatedItems = items.map((item) => {
      if (!item.packed) {
        return item;
      }
      return {
        ...item,
        packed: false,
      };
    });

    setItems(updatedItems);
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    console.log(item);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearItems() {
    const confirmation = window.confirm(
      "Are you sure you want to clear the list?"
    );
    confirmation && setItems([]);
  }

  return (
    <div className="app">
      <Title />
      <Form onAddItems={handleAddItems} />
      <NoteItems
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
        onPackedItems={handlePackedItems}
        onUnpackedItems={handleUnpackedItems}
      />
      <Stats items={items} />
    </div>
  );
}
