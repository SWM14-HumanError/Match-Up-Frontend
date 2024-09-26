import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import DetailToggleBox from '@components/DetailToggleBox.tsx';
import Footer from '@components/Footer.tsx';
import {IJobPostingDetail} from '@constant/interfaces.ts';
import {IJobDetail} from '@constant/initData.ts';
import authControl from '@constant/authControl.ts';
import dataGen from '@constant/dateGen.tsx';
import Api from '@constant/Api.ts';
import {JobPositionRecord, JobTypeRecord} from '@constant/selectOptions.ts';

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState<IJobPostingDetail>(IJobDetail);

  const tokenData = authControl.getInfoFromToken();
  const isAdmin = ['ADMIN'].includes(tokenData?.role);

  useEffect(() => {
    Api.fetch2Json(`/api/v1/job-posting/${id}`)
      .then(data => setJobDetail(data))
      .catch((e) => {
        if (!Api.goto404(navigate, e)) return;
      });
  }, [id]);

  function deleteJobPosting() {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      Api.fetch(`/api/v1/job-posting/${id}`, 'DELETE')
        .then(() => navigate('/jobs'))
        .catch((e) => {
          if (!Api.goto404(navigate, e)) return;
        });
    }
  }

  return (
    <>
      <Navigation/>

      <div className='main_layout project_detail_page'>
        <div className="project_detail_header">
          <h1>{jobDetail.title}</h1>

          <div className="project_thumbnail_layout">
            {jobDetail.imgUrl && (
              <img src={jobDetail.imgUrl} alt="project thumbnail"/>
            )}
          </div>

          <br/>

          <div className="center_layout">
            <span className='stack' style={{background: '#F2F2F2', borderRadius: '5px', padding: '4px 8px'}}>
              {JobTypeRecord[jobDetail.jobType]}
            </span>
              <span className='stack' style={{background: '#F2F2F2', borderRadius: '5px', padding: '4px 8px'}}>
              {JobPositionRecord[jobDetail.jobPosition]}
            </span>
          </div>

          <div className="center_layout">
            <label htmlFor="detail_job_apply_link">
              <b>지원링크:</b>
              <a id="detail_job_apply_link" href={jobDetail.applyLink} target="_blank" rel="noreferrer">
                jobDetail.applyLink
              </a>
            </label>
          </div>

        </div>

        <DetailToggleBox title="모집 상세">
          <div className="contents_border">
            <p>{dataGen.text2Dom(jobDetail.description)}</p>
          </div>
        </DetailToggleBox>

        {/*<DetailToggleBox title="모집 분야">*/}
        {/*  <div className="contents_border">*/}

        {/*  </div>*/}
        {/*</DetailToggleBox>*/}

        {isAdmin && (
          <div className='modify_button_layout'>
            {/*<Link to={`/update/job/${id}`}*/}
            {/*      className='button'>*/}
            {/*  수정하기*/}
            {/*</Link>*/}
            <button className='danger'
                    onClick={deleteJobPosting}>
              삭제하기
            </button>
          </div>
        )}
      </div>

      <Footer/>
    </>
  );
}

export default JobDetailPage;