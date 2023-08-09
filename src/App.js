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

function Title() {
  return (
    <div className="title">
      <h1>✒️ PersoNote 🚀</h1>
      <span>Capturing Goals, One Note at a Time</span>
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
  onUnpackedItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  if (sortBy === "date") {
    sortedItems = items
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  if (sortBy === "marked") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          {/* <option value="date">Sort by date</option> on Maintenance */}
          <option value="marked">Sort by marked status</option>
        </select>
        <button onClick={() => onPackedItems()}>Mark All Items</button>
        <button onClick={() => onUnpackedItems()}>Unmark All Items</button>
        <button onClick={() => onClearItems()}>Clear Items</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      {item.packed === false && (
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
      )}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.date} {item.note}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Try to add some goals into your list 🏁 </em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "🎇 Congrats!! You've beat all of your tasks 🎇 "
          : `📌 You've done (${percentage}%) ${numPacked} task from ${numItems} tasks, keep it up you can do it! 🎏`}
      </em>
    </footer>
  );
}
