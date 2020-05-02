import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { Svg, Ribbon } from '@potion/element';
import { Chord } from '@potion/layout';




const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res);
        const newColors = colors.map(each => {
          if (each.id === res.data.id) {
            return {
              ...res.data
            }
          } else {
            return each
          }
        });
        updateColors(newColors);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res);
        const updatedColors = colors.filter(each => each.id !== color.id);
        updateColors(updatedColors);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>

      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <Svg>
        <Chord
          data={[
            [11975, 5871, 8916, 2868],
            [1951, 10048, 2060, 6171],
            [8010, 16145, 8090, 8045],
            [1013, 990, 940, 6907],
          ]}
          animate
          nodeEnter={d => ({
            ...d,
            sourceStartAngle: d.sourceEndAngle,
            targetStartAngle: d.targetEndAngle,
          })}
        >{nodes => nodes.map((node, i) => (
          <Ribbon
            {...node}
            fill="black"
            stroke="black"
            fillOpacity={0.9}
            radius={400 * 0.4}
            transform={{ translate: [200, 200] }}
          />
        ))}</Chord>
      </Svg>

      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;