import FeedbackUserIcon from '../svgs/FeedbackUserIcon.tsx';

interface FeedbackCardItemProps {
  contents: string;
  feedbackType: string|null;
}

function FeedbackCardItem({ contents, feedbackType }: FeedbackCardItemProps) {
  function getRandColor() {
    // 파스텔 톤 컬러 10개
    const colors = [
      '#F1F1F1', '#ECF8F8', '#EEE4E1', '#E7D8C9',
      '#E6BEAE', '#BDE0FE', '#B5E5A5', '#F9D5B5',
      '#F8C0E4', '#C0C0C0', '#F5F5DC', '#F0F8FF',
      '#E6E6FA', '#FFF0F5', '#F0FFFF', '#F5F5F5',
      '#F0FFF0', '#F5FFFA', '#FFFFF0', '#FFFFE0',
      '#FFFAFA', '#FFF5EE', '#F5F5F5', '#FAF0E6',
      '#FAFAFA', '#FAFAD2', '#F0F8FF', '#F5F5DC',
      '#FFC8DD', '#FFEBCD', '#FFE4E1', '#FFE4B5',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <li className='project_detail_team_member'>
      <FeedbackUserIcon width={40} height={40} color={getRandColor()}/>
      <div>
        <p><b>{feedbackType ?? ' '}</b></p>
        <p>{contents}</p>
      </div>
    </li>
  );
}

export default FeedbackCardItem;