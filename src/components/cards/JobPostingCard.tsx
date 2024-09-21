import {useNavigate} from 'react-router-dom';
import {IJobPosting} from '@constant/interfaces.ts';
import Image from '@components/Image.tsx';

function JobPostingCard({id, title, companyName, jobPosition, jobType, imgUrl, deadLine}: IJobPosting) {
  const navigate = useNavigate();

  function goToDetail() {
    navigate(`/job/${id}`);
  }

  return (
    <div className='user_card' onClick={goToDetail}>
      <div className='user_header_contents_layout'>
        <div className='user_info_body'>
          <div className='image_layout'>
            <Image src={imgUrl} dummyTitle={companyName}/>
          </div>

          <div className='user_info_layout'>
            <h3>{title}</h3>
            <p>{companyName}</p>
            <div className='user_info_header'>
            </div>

          </div>
        </div>
        <div className='user_tag_layout'>
          <h5>직무</h5>
          <p>{jobPosition}</p>
        </div>
        <div className='user_tag_layout'>
          <h5>연차</h5>
          <p>{jobType}</p>
        </div>
        <div className='user_tag_layout'>
          <h5>마감일</h5>
          <p>{deadLine}</p>
        </div>

      </div>
    </div>
  );
}

export default JobPostingCard;