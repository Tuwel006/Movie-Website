import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const LinkInputSection = ({ links, setLinks }) => {
  const handleAddLink = () => {
    setLinks([...links, { index: "", url: "" }]);
  };

  const handleRemoveLink = (idx) => {
    setLinks(links.filter((_, i) => i !== idx));
  };

  const handleInputChange = (idx, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[idx][field] = value;
    setLinks(updatedLinks);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Add Links</h2>
      {links.map((link, idx) => (
        <div key={idx} className="flex items-center gap-4 mb-3">
          <input
            type="text"
            placeholder="Index"
            value={link.index}
            onChange={(e) => handleInputChange(idx, "index", e.target.value)}
            className="w-20 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="url"
            placeholder="URL"
            value={link.url}
            onChange={(e) => handleInputChange(idx, "url", e.target.value)}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => handleRemoveLink(idx)}
            className="text-red-500 hover:text-red-700"
          >
            <AiOutlineMinus size={20} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddLink}
        className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
      >
        <AiOutlinePlus size={20} /> Add Link
      </button>
    </div>
  );
};

export default LinkInputSection;
