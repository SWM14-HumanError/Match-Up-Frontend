interface ILike {
  width?: number;
  height?: number;
  type?: LikeType;
  enable: boolean;
}

export enum LikeType {
  FILL, STROKE
}
enum LikeColor {
  NONE = 'none',
  NORMAL = '#E1E1E1',
  ENABLE = '#FF8E8E',
  STROKE_ENABLE = '#777',
}

function Like({enable, type=LikeType.FILL, width=20, height=18}: ILike) {
  const types = [
    {fill: LikeColor.NORMAL, stroke: LikeColor.NORMAL, enableFill: LikeColor.ENABLE, enableStroke: LikeColor.ENABLE},
    {fill: LikeColor.NONE, stroke: LikeColor.STROKE_ENABLE, enableFill: LikeColor.ENABLE, enableStroke: LikeColor.ENABLE},
  ][type];

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="-1 -1 22 20" fill="none">
      <path d="M10.62 17.71C10.28 17.83 9.72 17.83 9.38 17.71C6.48 16.72 0 12.59 0 5.59C0 2.5 2.49 0 5.56 0C7.38 0 8.99 0.88 10 2.24C11.01 0.88 12.63 0 14.44 0C17.51 0 20 2.5 20 5.59C20 12.59 13.52 16.72 10.62 17.71Z"
            fill={enable ? types.enableFill : types.fill}
            stroke={enable ? types.enableStroke : types.stroke} strokeWidth='2'/>
    </svg>
  );
}

export default Like;