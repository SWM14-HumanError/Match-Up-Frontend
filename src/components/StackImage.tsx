interface IStackImage {
  stack: string;
}

function StackImage({stack}: IStackImage) {
  return (
    <img src={`src/assets/stacks/${stack}.png`} alt={stack}/>
  );
}

export default StackImage;