import '../../../styles/components/Maps.scss';

function DaijeonMap({selectedArea}: {selectedArea: string}) {
  return (
    <svg className='map_svg' style={{background:'transparent', overflow:'visible'}} viewBox='0 0 800 1002' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <filter id='dropshadow'>
          <feGaussianBlur in='SourceAlpha' stdDeviation='7'></feGaussianBlur>
          <feOffset dx='0' dy='0' result='offsetblur'></feOffset>
          <feMerge>
            <feMergeNode></feMergeNode>
            <feMergeNode in='SourceGraphic'></feMergeNode>
          </feMerge>
        </filter>
        <filter id='dropshadow2'>
          <feGaussianBlur in='SourceAlpha' stdDeviation='1.4'></feGaussianBlur>
          <feOffset dx='1' dy='1' result='offsetblur'></feOffset>
          <feMerge>
            <feMergeNode></feMergeNode>
            <feMergeNode in='SourceGraphic'></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <g filter='url(#dropshadow)'>
        { Object.keys(paths).map((key, index) => (
          <path key={index}
                id={paths[key].id}
                className={'OUTLINE' + (selectedArea === key ? ' SELECTED' : '')}
                d={paths[key].d}></path>
        ))}

      </g><g filter='url(#dropshadow2)'></g><g filter='url(#dropshadow2)'>
      { Object.keys(paths).map((key, index) => (
        <text key={index}
              id={paths[key].id}
              className='TEXT'
              x={paths[key].x}
              y={paths[key].y}>
          {key}
        </text>
      ))}
    </g></svg>
  )
}

interface IPath { [key: string]: any; }
const paths :IPath = {
  '동구': { id: 'CD30110', x: '552', y: '551', d: 'M 591 241 l -5 11 -1 12 4 11 7 14 7 22 8 15 9 1 9 -7 6 -23 11 -6 24 4 20 1 11 22 6 8 11 13 11 11 2 0 1 -1 1 3 -13 7 -25 -1 -20 13 -10 8 -6 4 2 6 -1 5 0 4 1 9 -2 7 2 6 1 9 -3 12 -3 18 -9 21 -19 11 -10 11 -10 10 1 15 3 17 0 2 -7 12 -6 18 3 27 -6 12 -3 -2 -3 2 -3 6 4 10 8 19 -3 23 -11 12 -2 11 -4 27 3 23 2 14 6 12 -3 10 -11 12 -17 9 -9 11 -14 9 1 12 3 6 -14 5 -8 9 -8 13 -8 16 -22 7 -17 -8 -10 -14 -18 -10 9 -6 2 -4 -4 -6 4 -9 0 -13 -4 -11 1 -4 6 -2 9 4 7 -6 6 -12 9 -18 -8 -18 -9 -13 -8 -18 9 -16 9 -13 -3 -11 -7 -13 -8 -20 -3 -13 10 2 4 -4 18 -9 17 6 16 1 -4 -11 -7 -15 -13 -19 -14 -9 -9 -17 -7 -11 -12 -18 -9 -11 -12 -19 8 -16 10 -8 13 -21 12 2 15 15 18 -3 21 5 4 -21 -9 -18 -7 -10 -9 -19 0 -23 2 -23 4 -18 14 -13 10 -9 11 -15 6 -14 14 -26 15 -22 z ' },
  '중구': { id: 'CD30140', x: '414', y: '666', d: 'M 506 607 l 7 15 4 11 -16 -1 -17 -6 -18 9 -4 4 -10 -2 3 13 8 20 7 13 3 11 -9 13 -9 16 8 18 9 13 8 18 -9 18 -6 12 -7 6 -9 -4 -6 2 -1 4 4 11 0 13 -4 9 4 6 -2 4 -9 6 -23 -16 -8 -20 -9 -12 -9 -15 -21 -8 3 -20 -5 -23 5 -22 -14 -23 -20 -9 -6 -19 -4 -11 -2 -6 4 -9 15 -13 10 -11 1 -8 0 0 -2 -6 -2 -6 6 -7 6 -15 2 -27 7 -15 12 -11 12 -13 5 -10 4 -18 16 13 12 4 12 19 9 11 12 18 7 11 9 17 14 9 z ' },
  '서구': { id: 'CD30170', x: '272', y: '667', d: 'M 326 648 l -4 7 2 6 4 11 6 19 -21 10 -8 23 4 19 3 28 -3 22 0 24 -3 18 -13 14 -12 12 -6 11 2 4 0 7 -8 11 -10 18 -15 7 -1 -30 -7 -16 -12 -7 -8 -25 -9 -17 -13 -9 -11 -12 -2 12 -20 -1 -2 -11 -14 -13 -10 -23 -2 -10 -1 -2 1 -6 -2 -7 3 -6 8 -13 15 -11 1 -2 2 0 11 -11 17 -9 8 -14 5 -15 13 -13 7 -20 8 -13 14 -11 7 -17 7 -10 -2 -23 4 -22 25 -3 5 -22 -4 -28 10 -12 9 -12 15 -13 18 -16 26 -1 15 5 14 22 4 8 0 0 2 6 4 20 -4 18 -5 10 -12 13 -12 11 -7 15 -2 27 -6 15 -6 7 2 6 2 6 0 0 -1 8 -10 11 z ' },
  '유성구': { id: 'CD30200', x: '247', y: '410', d: 'M 284 529 l -25 3 -4 22 2 23 -7 10 -7 17 -14 11 -8 13 -7 20 -13 13 -5 15 -8 14 -17 9 -11 11 -2 -1 -12 -2 -26 -10 -14 -9 -12 -7 -16 -14 -11 -17 3 -21 17 -6 0 -20 -1 -23 4 -26 -1 -12 2 0 11 -9 2 -21 16 -13 4 -18 -9 -27 12 -19 5 -12 1 -10 -2 -10 -1 -17 0 -24 2 -14 2 -13 8 -23 15 -6 9 -13 24 -9 25 6 23 -5 11 -8 11 -9 8 -25 7 -15 15 -10 8 -14 3 -6 -3 -9 0 -10 7 -10 5 -24 -7 -18 6 -18 11 4 4 -1 13 -12 11 -14 6 -2 13 6 12 11 13 15 6 9 1 21 -4 10 -2 20 -1 24 -12 14 -10 13 0 13 7 9 12 13 15 13 13 8 9 12 6 18 -7 21 -5 13 -4 16 0 22 -9 23 -21 9 -8 13 -15 -5 -26 1 -18 16 -15 13 -9 12 -10 12 4 28 z ' },
  '대덕구': { id: 'CD30230', x: '477', y: '317', d: 'M 572 149 l -5 20 -6 11 -2 12 7 12 12 4 11 -1 12 -5 12 2 1 11 -7 9 -16 17 -9 5 -15 22 -14 26 -6 14 -11 15 -10 9 -14 13 -4 18 -2 23 0 23 9 19 7 10 9 18 -4 21 -21 -5 -18 3 -15 -15 -12 -2 -13 21 -10 8 -8 16 -12 -4 -16 -13 -4 -20 -2 -6 0 0 -4 -8 -14 -22 8 -13 21 -9 9 -23 0 -22 4 -16 5 -13 7 -21 -6 -18 -9 -12 -13 -8 -15 -13 -12 -13 -7 -9 0 -13 10 -13 12 -14 18 3 22 -1 24 -4 14 1 -5 1 8 3 9 8 24 4 12 -6 7 -13 6 -25 9 -15 9 -7 z ' },
}

export const DaijeonLocationNames = Object.keys(paths);

export default DaijeonMap;