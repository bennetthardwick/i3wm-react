import { Terminal, HSplit, VSplit, Stacked, Tabbed } from '.';

export function renderGeneric(type: string, width: string, height: string, id: string, children?: any) {
  return <div>
    { () => {
      switch (type) {

        case "terminal":
        return <Terminal key={id} width={width} height={height} />

        case "h_split":
        return <HSplit key={id} width={width} height={height} children={children} />

        case "v_split":
        return <VSplit key={id} width={width} height={height} children={children} />

        case "stacked":
        return <Stacked key={id} width={width} height={height} children={children} />

        case "tabbed":
        return <Tabbed key={id} width={width} height={height} children={children} />

      }
    } 
  }
   </div>
    
}