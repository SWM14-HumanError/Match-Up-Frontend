import {useEffect, useState} from 'react';
import JobPostingCard from '@components/cards/JobPostingCard.tsx';
import {jobPostings as jobsDummy} from '@/dummies/dummyData.ts';
import {IJobPostingList} from '@constant/interfaces.ts';
import Api from '@constant/Api.ts';

interface IRecommendJobsProps {
  excludeIds?: number[];
  count?: number;
}

const InitJobs: IJobPostingList = {responseList: [], page: 0, totalDataCount: 0, totalPageCount: 0};
const JobPostingDummy: IJobPostingList = {
  ...InitJobs,
  responseList: jobsDummy,
}

function RecommendJobs({excludeIds=[], count=6}: IRecommendJobsProps) {
  const [jobs, setJobs] = useState<IJobPostingList>(InitJobs);
  const filteredJobs = jobs.responseList.filter((posting) => posting && !excludeIds.includes(posting.id)).slice(0, count);
  const noContents = !filteredJobs.length || !filteredJobs[0];

  useEffect(() => {
    const size = count + excludeIds.length;
    Api.fetch2Json(`/api/v1/job-posting?size=${size}`)
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
            filteredJobs.map((posting) => posting && (
            <JobPostingCard key={posting.id} {...posting}/>
          ))}
      </div>
    </div>
  );
}

export default RecommendJobs;