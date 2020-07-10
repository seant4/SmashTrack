import React from "react";
import List from "./list/List";


const Structure = (props) => (
  <svg width={375} height={812} viewBox="0 0 375 812" style={{zIndex: '-1'}}>
    <defs>
      <style>
        {
          ".a{fill:#3b3b3b;}.a,.c,.d{stroke:#707070;}.b,.d{fill:#fff;}.b{font-size:20px;font-family:SegoeUI, Segoe UI;}.c{fill:#616161;}.e,.h{fill:#707070;}.f,.h{stroke:none;}.g{fill:none;}"
        }
      </style>
    </defs>
    <g className="a">
      <rect className="f" width={375} height={52} />
      <rect className="g" x={0.5} y={0.5} width={374} height={63} />
    </g>
    <text className="b" transform="translate(34 36)">
      <tspan x={0} y={0}>
        {"Routines"}
      </tspan>
      <tspan x={0} y={27} />
    </text>
    <g className="c" transform="translate(0 52)">
      <rect className="f" width={375} height={760} />
      <rect className="g" x={0.5} y={0.5} width={374} height={747} />
    </g>
    <g className="d" transform="translate(10 127)">
      <rect className="f" width={356} height={674} rx={19} />
      <rect className="g" x={0.5} y={0.5} width={355} height={673} rx={18.5} />
    </g>
    <g className="d" transform="translate(12 69)" onClick={(e) => { props.onChange("Dashboard") }} >
      <ellipse className="f" cx={28.5} cy={27} rx={28.5} ry={27} />
      <ellipse className="g" cx={28.5} cy={27} rx={28} ry={26.5} />
    </g>
    <g className="e" transform="translate(34 98)" onClick={(e) => { props.onChange("Routines") }} >
      <path className="f" d="M11,20h0Z" />
      <path className="h" d="M 0 20 L 11 20 L 0 20 Z" />
    </g>
    <path
      d="M18,35.438A17.438,17.438,0,1,1,35.438,18,17.434,17.434,0,0,1,18,35.438Zm8.156-20.531H18V9.921a.844.844,0,0,0-1.441-.6L8.522,17.4a.836.836,0,0,0,0,1.188l8.037,8.079a.844.844,0,0,0,1.441-.6V21.094h8.156A.846.846,0,0,0,27,20.25v-4.5A.846.846,0,0,0,26.156,14.906Z"
      transform="translate(22.438 78.438)"
      onClick={(e) => { props.onChange("Dashboard") }}
    />
  </svg>
);

const RoutinesComponent = (props) =>{
  return(
    <>
    <List style={{ position: 'absolute', zIndex: '10', top: '25vh'}}/>
    <Structure style={{ position: 'absolute', zIndex: '-1',}}/>
    </>
  )
}

export default RoutinesComponent;
