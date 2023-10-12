import {ISvg, IUserTagPosition} from '../../constant/interfaces.ts';
import {BigTechTypeEn, BigTechTypeKo} from '../../constant/selectOptions.ts';

interface PositionLevelsGraphProps extends ISvg{
  userPositions: IUserTagPosition[] | null;
}
interface IPositionIndex {
  [key: string]: number;
}

const PositionIndex: IPositionIndex = {
  'PLAN': 0, 'FE': 1, 'BE': 2, 'APP': 3, 'GAME': 4, 'AI': 5
}

// 육각형에 레벨을 표시하는 그래프, 레벨은 1~5까지 표시, 분야는 기획, 프론트, 앱, 백엔드, AI, 게임 으로 표시
// bestPositionLevel 에 따라 육각형의 크기가 최대한 커지도록 함
// userPositions 에 따라 각 분야의 레벨이 표시되도록 함, 선으로 연결하여 표시
function PositionLevelsGraph({width=280, height=280, userPositions}: PositionLevelsGraphProps) {
  const HexagonRadius = 140;

  let bestPositionLevel = 0;
  userPositions = userPositions || [];

  let positionLevels = Array.from({length: 6}, () => 0.1);
  userPositions.forEach((userPosition) => {
    if (!Object.keys(PositionIndex).includes(userPosition.type))
      return;

    bestPositionLevel = Math.max(bestPositionLevel, userPosition.typeLevel + 1);
    positionLevels[PositionIndex[userPosition.type]] = userPosition.typeLevel + 1;
  });

  if (bestPositionLevel === 0)
    return (
      <img src='/uxui.jpeg' alt=''/>
    );

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={`-200 -200 400 400`} fill='none'>
      <g clipPath='url(#clip0)'>
        { Array.from({length: bestPositionLevel}, (_, i) => i + 1).map((level) => (
          <polygon key={level}
                   points={getHexagonPointsString(HexagonRadius * level / (bestPositionLevel))}
                   stroke='#E5E5E5'
                   strokeWidth='2'
                   strokeDasharray='5,5'/>
        )) }
      </g>

      <g clipPath='url(#clip0)'>
        <polygon points={getHexagonPointsFromLevels(HexagonRadius, bestPositionLevel, positionLevels)}
                 stroke='#0064FF'
                 strokeWidth='3'
                 fill='rgba(0, 100, 255, 0.30)'/>
      </g>

      <g>
        { HexagonPoints.map((point, index) => (
          <text key={index}
                x={point[0] * HexagonRadius * 1.1}
                y={point[1] * HexagonRadius * 1.1}
                fill='#333333'
                textAnchor='middle'
                alignmentBaseline='middle'>
            { BigTechTypeKo[BigTechTypeEn.indexOf(Object.keys(PositionIndex)[index])] }
          </text>
        ))}
      </g>
    </svg>
  );
}

const HexagonPoints = [
  [0, -1],
  [-Math.sqrt(3) / 2, - 1 / 2],
  [-Math.sqrt(3) / 2, 1 / 2],
  [0, 1],
  [Math.sqrt(3) / 2, 1 / 2],
  [Math.sqrt(3) / 2, -1 / 2],
];

function getHexagonPointsString(r: number) {
  return HexagonPoints.map((point) =>
    `${point[0] * r} ${point[1] * r}`
  ).join(' ');
}

function getHexagonPointsFromLevels(r: number, maxLevel: number, positionLevels: number[]) {
  return HexagonPoints.map((point, index) => {
    const level = positionLevels[index];
    const ratio = level / maxLevel;
    return `${point[0] * r * ratio} ${point[1] * r * ratio}`;
  }).join(' ');
}

export default PositionLevelsGraph;