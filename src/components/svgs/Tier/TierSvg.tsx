import TierBronze from "./TierBronze.tsx";
import TierSilver from "./TierSilver.tsx";
import TierGold from "./TierGold.tsx";
import TierPlatinum from "./TierPlatinum.tsx";
import TierDiamond from "./TierDiamond.tsx";

interface ITierSvg {
  width: number,
  height: number,
  tier: number,
}

function TierSvg({width=171, height=222, tier=0}: ITierSvg) {
  switch (tier) {
    case 0:
      return (<TierBronze width={width} height={height}/>);
    case 1:
      return (<TierSilver width={width} height={height}/>);
    case 2:
      return (<TierGold width={width} height={height}/>);
    case 3:
      return (<TierPlatinum width={width} height={height}/>);
    case 4:
      return (<TierDiamond width={width} height={height}/>);
    default:
        return (<TierBronze width={width} height={height}/>);
  }
}

export default TierSvg;