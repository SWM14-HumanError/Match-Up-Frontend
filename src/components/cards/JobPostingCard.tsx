import {Link} from 'react-router-dom';
import {IJobPosting} from '@constant/interfaces.ts';
import {JobTypeOptions} from '@constant/selectOptions.ts';
import Image from '@components/Image.tsx';

import '@styles/components/UserCard.scss';


const JobTypeRecord: Record<string, string> = JobTypeOptions.reduce((acc, curr) => {
  acc[curr.value] = curr.option;
  return acc;
}, {} as Record<string, string>);

const JobPositionRecord: Record<string, string> = JobTypeOptions.reduce((acc, curr) => {
  acc[curr.value] = curr.option;
  return acc;
}, {} as Record<string, string>);

function time2Date(time: string) {
  return time.split('T')[0] ?? '';
}

function JobPostingCard({id, title, companyName, jobPosition, jobType, imgUrl, deadLine}: IJobPosting) {
  const href = `/job/${id}`;

  return (
    <Link className='user_card job_card' to={href}>
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
          <p>{JobPositionRecord[jobPosition]}</p>
        </div>
        <div className='user_tag_layout'>
          <h5>연차</h5>
          <p>{JobTypeRecord[jobType]}</p>
        </div>
        <div className='user_tag_layout'>
          <h5>마감일</h5>
          <p>{time2Date(deadLine)}</p>
        </div>

      </div>
    </Link>
  );
}

export default JobPostingCard;