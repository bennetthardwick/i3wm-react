import * as React from 'react';
import { Terminal, HSplit, VSplit, Stacked, Tabbed } from '.';

let setWindow;

export function renderGeneric(type: string, width: string, height: string, id: string, children?: any, window?: any) {

  setWindow = (window) ? window : setWindow;

  switch (type) {
    case "terminal":
      return <Terminal id={id} key={id} width={width} height={height} type={type} setWindow={setWindow} />

    case "h_split":
      return <HSplit key={id} width={width} height={height} tree={children} />

    case "v_split":
      return <VSplit key={id} width={width} height={height} tree={children} />

    case "stacked":
      return <Stacked key={id} width={width} height={height} tree={children} />

    case "tabbed":
      return <Tabbed key={id} width={width} height={height} tree={children} />

    case "root":
      return <VSplit key={id} width={width} height={height} tree={children} />
  }
}