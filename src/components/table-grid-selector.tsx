"use client";

import React, {useState} from "react";

interface TableGridSelectorProps {
  maxRows?: number;
  maxCols?: number;
  onSelect: (rows: number, cols: number) => void;
}

const TableGridSelector: React.FC<TableGridSelectorProps> = ({
                                                               maxRows = 6,
                                                               maxCols = 6,
                                                               onSelect
                                                             }) => {
  const [hoveredRow, setHoveredRow] = useState(0);
  const [hoveredCol, setHoveredCol] = useState(0);

  const handleMouseEnter = (row: number, col: number) => {
    setHoveredRow(row);
    setHoveredCol(col);
  };

  const handleClick = () => {
    onSelect(hoveredRow + 1, hoveredCol + 1);
  };

  return (
    <div
      className="p-2 bg-white border rounded shadow-md grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, 20px)`,
        gridTemplateRows: `repeat(${maxRows}, 20px)`
      }}
    >
      {Array.from({length: maxRows}).map((_, row) =>
        Array.from({length: maxCols}).map((_, col) => {
          const isActive = row <= hoveredRow && col <= hoveredCol;
          return (
            <div
              key={`${row}-${col}`}
              onMouseEnter={() => handleMouseEnter(row, col)}
              onClick={handleClick}
              className={`w-5 h-5 border rounded-sm cursor-pointer ${
                isActive ? "bg-blue-500" : "bg-gray-100 hover:bg-blue-100"
              }`}
            />
          );
        })
      )}
      <div className="col-span-full text-sm pt-2 text-center" style={{gridColumn: `span ${maxCols}`}}>
        {hoveredRow + 1} x {hoveredCol + 1}
      </div>
    </div>
  );
};

export default TableGridSelector;
