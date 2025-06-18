import React, { useEffect, useState } from "react";

const StateCard = ({ stateName, stateCode, selectedYear }) => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [gsdpData, setGsdpData] = useState(null); // for GSDP info

  // Fetch tags on state change
  useEffect(() => {
    if (stateCode) {
      fetch(`http://localhost:3000/api/tags/${stateCode}`)
        .then((res) => res.json())
        .then((data) => setTags(data))
        .catch((err) => console.error(err));
    }
  }, [stateCode]);

  // Fetching GSDP data by year and returning it in the card
  useEffect(() => {
    if (selectedYear) {
      fetch(`http://localhost:3000/api/data/gsdp/${selectedYear}`)
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((entry) => entry.state === stateName);
          setGsdpData(found);
        })
        .catch((err) => console.error(err));
    }
  }, [stateName, selectedYear]);

  // Posting a new tag
  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state_code: stateCode, tag_name: newTag }),
      });

      if (!res.ok) throw new Error("Failed to add tag");

      const createdTag = await res.json();
      setTags((prev) => [createdTag, ...prev]);
      setNewTag("");
    } catch (err) {
      console.error(err);
    }
  };

  // Upvoting tag
  const handleUpvote = async (tagId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/tags/upvote/${tagId}`,
        {
          method: "PUT",
        }
      );

      const updatedTag = await res.json();
      setTags((prev) =>
        prev.map((tag) => (tag._id === tagId ? updatedTag : tag))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="state-card"
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginTop: "1rem",
        borderRadius: "8px",
      }}
    >
      <h2>
        {stateName} — {selectedYear}
      </h2>

      {/* GSDP Data Section in the card */}
      {gsdpData ? (
        <div style={{ marginBottom: "1rem" }}>
          <h4>GSDP Data:</h4>
          <p>
            <strong>GSDP (Current Prices):</strong>{" "}
            {gsdpData.CurrentPrices || "N/A"}
          </p>
          <p>
            <strong>Growth % (Current Prices):</strong>{" "}
            {gsdpData.CurrentPercentage || "N/A"}
          </p>
          <p>
            <strong>GSDP (Constant Prices):</strong>{" "}
            {gsdpData.ConstantPrices || "N/A"}
          </p>
          <p>
            <strong>Growth % (Constant Prices):</strong>{" "}
            {gsdpData.ConstantPercentage || "N/A"}
          </p>
        </div>
      ) : (
        <p>Loading GSDP data...</p>
      )}

      {/* Add Tag form in the card*/}
      <form onSubmit={handleAddTag} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add tags"
        />
        <button type="submit">Add Tag</button>
      </form>

      {/* Tags List */}
      <ul>
        {tags.map((tag) => (
          <li key={tag._id}>
            {tag.tag_name} — {tag.upvotes} upvotes{" "}
            <button onClick={() => handleUpvote(tag._id)}>⬆</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StateCard;
