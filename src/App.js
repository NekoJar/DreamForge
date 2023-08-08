import { useState } from "react";
import "./index.css";

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
    const checkedItems = items.map((item) => ({
      ...item,
      input: item.input,
    }));

    setItems(checkedItems);
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearItems() {
    setItems([]);
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
      />
      <Stats />
    </div>
  );
}

function Title() {
  return (
    <div>
      <h1>✒️ PersoNote 🚀</h1>
    </div>
  );
}

function Form({ onAddItems }) {
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newItems = { note, date, packed: false, id: crypto.randomUUID() };
    onAddItems(newItems);

    setNote("");
    setDate("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hey!👋 Try to add some goals for your future!</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="Add smth..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        required
      ></input>
      <button>Add</button>
    </form>
  );
}

function NoteItems({
  items,
  onDeleteItems,
  onToggleItem,
  onClearItems,
  onPackedItems,
}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select>
          <option>akdwo</option>
        </select>
        <button onClick={() => onPackedItems()}>Mark All Items</button>
        <button onClick={() => onClearItems()}>Clear Items</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.date} {item.note}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return <div className="stats"></div>;
}
