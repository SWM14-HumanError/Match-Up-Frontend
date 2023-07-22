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
          <h3>{title}</h3>
          <span>작성자</span>
          <span> ・ </span>
          <span>{date}</span>
        </div>
        <div>
          <button>공유하기</button>
          <button>좋아요</button>
        </div>
      </div>

      <div className='card_body_layout'>
        <img src={image} alt='feed_img'/>

        <div className='card_body'>
          <p className='card_text'>{description}</p>

          <div className="comment_layout">
            <div className='card_comment'>
              <h6>작성자 ・ 작성일</h6>
              <p>댓글 내용</p>
            </div>
          </div>
        </div>
      </div>

      <div className='card_comment_layout'>
        <input type="text"/>
        <button>댓글 작성</button>
        <button className='selected'>구독 중</button>
      </div>

    </div>
  );
}

export default FeedCard;