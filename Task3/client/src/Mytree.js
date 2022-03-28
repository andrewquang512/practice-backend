import React, { useRef, useEffect } from 'react';
import OrgChart from '@balkangraph/orgchart.js';

const Mytree = ({ nodes }) => {
  const divRef = useRef();
  useEffect(() => {
    const chart = new OrgChart(divRef.current, {
      nodes: nodes,

      nodeBinding: {
        field_0: 'name',
        img_0: 'img',
      },
    });
  }, []);
  return <div id='tree' ref={divRef}></div>;
};

export default Mytree;
