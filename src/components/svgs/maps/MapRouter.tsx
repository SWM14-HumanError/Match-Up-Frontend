import KoreaMap, {KoreaAbbreviatedLocationNames} from './KoreaMap.tsx';
import SeoulMap, {SeoulLocationNames} from './SeoulMap.tsx';
import GyeonggiMap, {GyeonggiLocationNames} from './GyeonggiMap.tsx';
import DaijeonMap, {DaijeonLocationNames} from './DaijeonMap.tsx';
import DaeguMap, {DaeguLocationNames} from './DaeguMap.tsx';
import SejongMap, {SejongLocationNames} from './SejongMap.tsx';
import JeonlanamdoMap, {JeonlanamdoLocationNames} from './JeonlanamdoMap.tsx';
import JeonlabukdoMap, {JeonlabukdoLocationNames} from './JeonlabukdoMap.tsx';

interface IMapRouterProps {
  locationName: string;
}
function MapRouter({locationName}: IMapRouterProps) {
  const bigLoc = locationName.slice(0, 2);
  const smallLoc = locationName.slice(2);
  
  const MapComponentList: IMapList = {
    '서울': <SeoulMap selectedArea={smallLoc}/>,
    '경기': <GyeonggiMap selectedArea={smallLoc}/>,
    '인천': <KoreaMap selectedArea={KoreaAbbreviatedLocationNames[bigLoc]}/>,
    '대전': <DaijeonMap selectedArea={smallLoc}/>,
    '충북': <KoreaMap selectedArea={KoreaAbbreviatedLocationNames[bigLoc]}/>,
    '충남': <KoreaMap selectedArea={KoreaAbbreviatedLocationNames[bigLoc]}/>,
    '부산': <KoreaMap selectedArea={KoreaAbbreviatedLocationNames[bigLoc]}/>,
    '울산': <KoreaMap selectedArea={KoreaAbbreviatedLocationNames[bigLoc]}/>,
    '경북': <KoreaMap selectedArea={KoreaAbbreviatedLocationNames[bigLoc]}/>,
    '경남': <KoreaMap selectedArea={KoreaAbbreviatedLocationNames[bigLoc]}/>,
    '대구': <DaeguMap selectedArea={smallLoc}/>,
    '광주': <KoreaMap selectedArea={KoreaAbbreviatedLocationNames[bigLoc]}/>,
    '전북': <JeonlabukdoMap selectedArea={smallLoc}/>,
    '전남': <JeonlanamdoMap selectedArea={smallLoc}/>,
    '제주': <KoreaMap selectedArea={KoreaAbbreviatedLocationNames[bigLoc]}/>,
    '강원': <KoreaMap selectedArea={KoreaAbbreviatedLocationNames[bigLoc]}/>,
    '세종': <SejongMap selectedArea={smallLoc}/>,
  }
  
  return Object.keys(MapComponentList).includes(bigLoc) ?
    MapComponentList[bigLoc] :
    ( <KoreaMap selectedArea={KoreaAbbreviatedLocationNames[bigLoc]}/> );
}

interface IMapList { [key: string]: any; }
export const MapList: IMapList = {
  '서울': SeoulLocationNames,
  '경기': GyeonggiLocationNames,
  '인천': [],
  '대전': DaijeonLocationNames,
  '충북': [],
  '충남': [],
  '부산': [],
  '울산': [],
  '경북': [],
  '경남': [],
  '대구': DaeguLocationNames,
  '광주': [],
  '전북': JeonlabukdoLocationNames,
  '전남': JeonlanamdoLocationNames,
  '제주': [],
  '강원': [],
  '세종': SejongLocationNames,
};

export const MapLocationName = Object.keys(MapList);

export default MapRouter;