import {useEffect, useState} from 'react';
import SelectBox from './SelectBox.tsx';
import {MapList, MapLocationName} from '../svgs/maps/MapRouter.tsx';

interface ILocationSelector {
  value: string;
  onChange: (value: string) => void;
}
function LocationSelector({value, onChange}: ILocationSelector) {
  const BigLoc = value.slice(0, 2);
  const SmallLoc = value.slice(2);
  
  const [bigLocation, setBigLocation] = useState<string>(BigLoc ? BigLoc : MapLocationName[0]);
  const [smallLocation, setSmallLocation] = useState<string>(SmallLoc ? SmallLoc : '');

  useEffect(() => {
    setSmallLocation(MapList[bigLocation].length ? MapList[bigLocation][0] : '');
  }, [bigLocation]);
  
  useEffect(() => {
    const newValue = bigLocation + (smallLocation ? ' ' + smallLocation : '');
    if (newValue !== value)
      onChange(newValue);
  }, [bigLocation, smallLocation]);
  
  return (
    <>
      <SelectBox options={MapLocationName}
                 value={bigLocation}
                 onChange={value => setBigLocation(value)}
                 hasDefault={false}/>
      { MapList[bigLocation].length ? (
        <SelectBox options={MapList[bigLocation]}
                   value={smallLocation}
                   onChange={value => setSmallLocation(value)}
                   hasDefault={false}/>
      ) : null}
    </>
  );
}

export default LocationSelector;