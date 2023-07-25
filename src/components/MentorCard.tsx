interface IMentorCard {
  mentorId: number,
  mentorName: string,
  mentorImage: string,
  mentorDescription: string,
  heart: number,
  star: number,
}

function MentorCard({mentorId, mentorName, mentorDescription, mentorImage, star, heart}: IMentorCard) {
  return (
    <div className="mentor_card">
      <h3>{mentorName}</h3>
      <div className="mentor_body_layout">
        <p>{mentorDescription}</p>
        <img src={mentorImage} alt="mentor name" />
      </div>
      <div className='score_layout'>
        <span>{mentorId}</span>
        <div>
          <div className='heart_layout'>
            <img src='' alt='heart'/>
            <p>{heart}</p>
          </div>
          <div className='star_layout'>
            <img src='' alt='star'/>
            <p>{star}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorCard;