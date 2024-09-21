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

function JobDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState<IJobPostingDetail>(IJobDetail);

  const tokenData = authControl.getInfoFromToken();
  const isAdmin = ['ADMIN'].includes(tokenData?.role);

  useEffect(() => {
    Api.fetch2Json(`api/v1/job-posting/${id}`)
      .then(data => setJobDetail(data))
      .catch((e) => {
        if (!Api.goto404(navigate, e)) return;
      });
  }, [id]);

  function deleteJobPosting() {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      Api.fetch(`api/v1/job-posting/${id}`, 'DELETE')
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
        <div className='project_detail_header'>
          <h1>{jobDetail.title}</h1>

          <div className='project_thumbnail_layout'>
            {jobDetail.imgUrl && (
              <img src={jobDetail.imgUrl} alt='project thumbnail'/>
            )}
          </div>

          <a className='button' href={jobDetail.applyLink} target='_blank' rel='noreferrer'>
            공식 페이지
          </a>
          <button className='stack'>
            {jobDetail.jobType}
          </button>
          <button className='stack'>
            {jobDetail.jobPosition}
          </button>
        </div>

        <DetailToggleBox title='모집 상세'>
          <div className='contents_border'>
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