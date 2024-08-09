import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import FoldListComponent from '@components/FoldListComponent.tsx';
import Footer from '@components/Footer.tsx';
import Api from '@constant/Api.ts';

import '@styles/MainProjectPage.scss';
import '@styles/FoldListPage.scss';

function MyInquiryPage() {
  const [myInquiries, setMyInquiries] = useState<any[]>([]);

  useEffect(() => {
    Api.fetch('/api/v1/inquiry/my')
      .then(res => res?.json())
      .then(res => {
        if (res?.ok) setMyInquiries(res.data);
      })
      .catch(err => console.error(err));
  }, []);
  
  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>문의 내역</h1>

        {!myInquiries.length && (
          <div className='card_layout'>
            <div className='no_contents'>
              <p>문의 내역이 없습니다.</p>
            </div>
          </div>
        )}
        <ul className='fold_list_layout'>
          {myInquiries.map((inquiry, index) => (
            <FoldListComponent key={index} title={inquiry.title}>
              {inquiry.content}
            </FoldListComponent>
          ))}
        </ul>

        <p>문의사항이나, 불편한 점 또는 버그 발견 시 &nbsp;
          <Link to='/inquiry/personal'>1:1 문의</Link>
          주시면, SideMatch 개발자에게 도움이 됩니다.
        </p>

        {Array.from({length: 10}).map(_ => (<br/>))}

      </div>
      
      <Footer/>
    </>
  );
}

export default MyInquiryPage;