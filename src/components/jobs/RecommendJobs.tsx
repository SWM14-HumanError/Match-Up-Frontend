import {useEffect, useState} from 'react';
import JobPostingCard from '@components/cards/JobPostingCard.tsx';
import {jobPostings as jobsDummy} from '@/dummies/dummyData.ts';
import {IJobPostingList} from '@constant/interfaces.ts';
import Api from '@constant/Api.ts';


const InitJobs: IJobPostingList = {responseList: [], page: 0, totalDataCount: 0, totalPageCount: 0};
const JobPostingDummy: IJobPostingList = {
  ...InitJobs,
  responseList: jobsDummy,
}

function RecommendJobs() {
  const [jobs, setJobs] = useState<IJobPostingList>(InitJobs);
  const noContents = !jobs.responseList.length || !jobs.responseList[0];

  useEffect(() => {
    Api.fetch2Json(`/api/v1/job-posting`)
      .then((data) => {
        setJobs(data);
      }).catch((err) => {
      console.error(err);
      setJobs(Api.isLocalhost() ? JobPostingDummy : InitJobs);
    });
  }, []);

  return (
    <div className={'card_layout' + (noContents ? ' no_contents' : ' three_cards job_card_layout')}>
      <div>
        {noContents ? (
            <div className='list_no_contents'>
              <p>채용 공고가 없습니다</p>
            </div>
          ) :
          jobs.responseList.slice(0, 6).map((posting) => posting && (
            <JobPostingCard key={posting.id} {...posting}/>
          ))}
      </div>
    </div>
  );
}

export default RecommendJobs;