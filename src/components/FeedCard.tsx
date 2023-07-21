interface IFeedCard {
  title: string,
  image: string,
  description: string,
  date: string,
}
function FeedCard({title, description, image, date}: IFeedCard) {
  return (
    <div className='feed_card'>
      <div className='feed_header'>
        <div>
          <h6>{date}</h6>
          <h6>작성자</h6>
          <button>구독</button>
          <button>메세지 보내기</button>
        </div>
        <div>
          <button>좋아요</button>
          <button>공유하기</button>
        </div>
      </div>

      <div className='card_body_layout'>
        <div className='card_body'>
          <h5 className='card_title'>{title}</h5>
          <img src={image} alt='feed_img'/>
          <p className='card_text'>{description}</p>
        </div>

        <div className='card_comment_layout'>
          <div className='card_comment'>
            <h6>댓글</h6>
            <div>
              <h6>작성자</h6>
              <p>댓글 내용</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default FeedCard;