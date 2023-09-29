import { stateAdmin } from "../../store/state.store"

const SvgPendus = () => {
  const id = stateAdmin((state)=>state.counter)
  return (
    <svg id="svgPendus" width="276" height="302" viewBox="0 0 276 302" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line className={id >=1 ? "active" : ""} y1="301" x2="150" y2="301" stroke="white" strokeWidth="2"/>
        <line className={id >=2 ? "active" : ""} x1="74" y1="302" x2="74" y2="2" stroke="white" strokeWidth="2"/>
        <line className={id >=3 ? "active" : ""} x1="75" y1="1" x2="225" y2="1" stroke="white" strokeWidth="2"/>
        <line className={id >=4 ? "active" : ""} x1="74.2929" y1="107.359" x2="180.359" y2="1.29289" stroke="white" strokeWidth="2"/>
        <line className={id >=5 ? "active" : ""} x1="226" y1="2" x2="226" y2="52" stroke="white" strokeWidth="2"/>
        <circle className={id >=6 ? "activeCircle" : ""} cx="225" cy="80" r="28" fill="#D9D9D9"/>
        <line className={id >=7 ? "active" : ""} x1="226" y1="108" x2="226" y2="208" stroke="white" strokeWidth="2"/>
        <line className={id >=8 ? "active" : ""} x1="226" y1="143" x2="276" y2="143" stroke="white" strokeWidth="2"/>
        <line className={id >=8 ? "active" : ""} x1="176" y1="143" x2="226" y2="143" stroke="white" strokeWidth="2"/>
        <line className={id >=9 ? "active" : ""} x1="227.062" y1="207.707" x2="191.707" y2="243.062" stroke="white" strokeWidth="2"/>
        <line className={id >=10 ? "active" : ""} x1="260.648" y1="243.062" x2="225.293" y2="207.707" stroke="white" strokeWidth="2"/>
    </svg>
    )
}

export default SvgPendus

