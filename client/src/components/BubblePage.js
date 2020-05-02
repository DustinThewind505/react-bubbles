import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import { Pack } from '@potion/layout';
import { Svg, Circle } from '@potion/element';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth().get("/api/colors")
      .then(res => {
        console.log(res);
        setColorList(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />

      <Svg width={400} height={400}>
  <Pack
    data={{
      children: [
        { value: 1, key: '1' },
        { value: 2, key: '2' },
        { value: 3, key: '3' },
      ],
    }}
    sum={datum => datum.value}
    size={[400, 400]}
    includeRoot={false}
    nodeEnter={d => ({ ...d, r: 0 })}
    animate
  >{nodes => nodes.map(({ x, y, r, key }) => (
    <Circle
    className='circle'
      key={key}
      cx={x}
      cy={y}
      r={r}
      fill="black"
    />
  ))}</Pack>
</Svg>


    </>
  );
};

export default BubblePage;