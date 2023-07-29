function StackImage({stack}: IStackImage) {
  return (
    <div className='stack_layout'>
      <img src={`src/assets/stacks/${stack}.png`} alt={stack}/>
      <span>{stack}</span>
    </div>
);
}

interface IStackImage {
  stack: string;
}

export default StackImage;