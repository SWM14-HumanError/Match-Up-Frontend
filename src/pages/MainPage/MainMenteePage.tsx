import {useRef, useState} from 'react';
import Navigation from '../../components/navigation/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import Search from '../../components/svgs/Search.tsx';
import UserCard from '../../components/cards/UserCard.tsx';
import LoadingComponent from '../../components/LoadingComponent.tsx';
import useInfScroll from '../../hooks/useInfScroll.ts';
import Footer from '../../components/Footer.tsx';
import {IUser, IUserCardList} from '../../constant/interfaces.ts';
import {ProjectRecruitFields} from '../../constant/selectOptions.ts';
import {mentees} from '../../dummies/dummyData.ts';
import '../../styles/MainProjectPage.scss';

function MainMenteePage() {
  const [selectedUserStack, setSelectedUserStack] = useState<string>(ProjectRecruitFields[0]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const {data, loading, isEnded, setReqParams}
    = useInfScroll<IUserCardList>('/api/v1/list/user', 'userCardResponses', infScrollLayout, mentees, {});

  return (
    <div>
      <Navigation/>

      <div className='banner'>
        <div>
          <h1>
            우리 모임과 함께할 <br/>
            멘티분을 구해요
          </h1>
          <p>
            MatchUp은 프로젝트/스터디의 팀원과 멘토를 구하는 매칭 서비스입니다. <br/>
            하고 싶은 프로젝트/스터디를 정해서 팀원을 구해보세요!
          </p>
        </div>
      </div>

      <div className='main_layout'>
        <div className='project'>
          <div className='header_layout'>
            <h2>팀원</h2>
            <span>나에게 맞는 팀원를 구해보세요 🔥</span>
          </div>
          <div className='search_layout'>
            <SelectBox options={ProjectRecruitFields}
                       value={selectedUserStack}
                       onChange={value => setSelectedUserStack(value)}/>
            <input type='text'
                   className='search'
                   placeholder='키워드를 한글자 이상 입력해주세요'
                   value={searchKeyword}
                   onChange={e => setSearchKeyword(e.target.value)}/>
            <button className='search_button'
                    onClick={() => setReqParams({
                      stack: selectedUserStack === ProjectRecruitFields[0] ? '' : selectedUserStack,
                      keyword: searchKeyword,
                    })}>
              <Search/>
            </button>
          </div>

          <div className={'card_layout' + (!loading && (!data.userCardResponses.length || !data.userCardResponses[0]) ? ' no_contents' : ' user_card_layout')}
               ref={infScrollLayout}>
            <div>
              { !loading && (!data.userCardResponses.length || !data.userCardResponses[0]) ? (
                <div className='list_no_contents'>
                  <p>팀원이 없습니다</p>
                </div>
              ):
              data.userCardResponses.map((mentee: IUser | null | undefined, index: number) => mentee && (
                <UserCard key={index} {...mentee}/>
              ))}
            </div>

            <div className='loading_component_div'>
              {loading && <LoadingComponent/>}
            </div>
          </div>
        </div>
      </div>

      {isEnded && (<Footer/>)}
    </div>
  );
}

export default MainMenteePage;