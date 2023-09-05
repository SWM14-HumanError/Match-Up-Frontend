import {useEffect, useState} from 'react';
import SelectBox from '../components/inputs/SelectBox.tsx';
import {LocationNames} from '../constant/selectOptions.ts';
import {InitAdditionalInfo} from '../constant/initData.ts';
import {IAdditionalInfo} from '../constant/interfaces.ts';
import authControl from '../constant/authControl.ts';

import '../styles/SigninTerms.scss';

function SignInTerms() {
  const [page, setPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTermsAgree, setIsTermsAgree] = useState(false);
  const [isPrivacyAgree, setIsPrivacyAgree] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const [additionalInfo, setAdditionalInfo] = useState<IAdditionalInfo>(InitAdditionalInfo);

  useEffect(() => {
    if (isTermsAgree && isPrivacyAgree)
      setIsAgree(true);
    else
      setIsAgree(false);
  }, [isTermsAgree, isPrivacyAgree]);

  function saveAdditionalInfo() {
    setIsSubmitting(true);
    fetch('', {
      method: 'POST',
      headers: authControl.getHeader(),
      body: JSON.stringify({
        ...additionalInfo,
        userBirthday: `${additionalInfo.userBirthdayYear}-${additionalInfo.userBirthdayMonth}-${additionalInfo.userBirthdayDay}`,
      })
    })
      .then(res => {
        if (res.status < 300) {
          setIsSubmitting(false);

          const redirectUrl = localStorage.getItem('redirectUrl');
          window.location.href = redirectUrl ? redirectUrl : '/';
        }
        else {
          setIsSubmitting(false);
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      })
  }

  return (
    <div className='main_layout'>
      <h1>회원가입</h1>

      <div className={'signup_terms_layout' + (page !== 0 ? ' invisible' : '')}>

        <h2>서비스 이용약관</h2>
        <div className='scroll_layout'>
          <h3>제 1조 (목적)</h3>
          이 약관은 Match-UP 팀원 매칭 플랫폼(이하 '서비스')의 이용 조건과 절차, 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

          <h3>제 2조 (정의)</h3>
          <ol>
            <li>'회사'는 Match-UP 팀원 매칭 플랫폼을 제공하는 주체를 의미합니다.</li>
            <li>'이용자'는 서비스를 이용하는 개인 또는 단체를 의미합니다.</li>
            <li>'서비스'는 회사가 제공하는 팀원 매칭 플랫폼 및 관련 서비스를 의미합니다.</li>
          </ol>

          <h3>제 3조 (이용계약의 체결)</h3>
          <ol>
            <li>서비스를 이용하고자 하는 이용자는 회사가 제공하는 가입 절차를 따라 계정을 생성하여 이용계약을 체결합니다.</li>
            <li>이용자는 서비스 가입 시 제공하는 정보가 정확하고 최신인지 유지해야 합니다.</li>
          </ol>

          <h3>제 4조 (서비스의 이용)</h3>
          <ol>
            <li>이용자는 본 약관 및 관련 법령을 준수하여 서비스를 이용해야 합니다.</li>
            <li>서비스를 통해 제공되는 정보의 정확성에 대해서는 회사가 보장하지 않습니다.</li>
            <li>이용자는 다른 이용자에 대한 존중과 예의를 지켜야 합니다.</li>
          </ol>

          <h3>제 5조 (개인정보 처리방침)</h3>
          이용자의 개인정보는 회사의 개인정보 처리방침에 따라 수집, 이용, 보관됩니다. 개인정보 처리방침에 대한 내용은 회사 웹사이트 내에서 확인할 수 있습니다.

          <h3>제 6조 (계약의 해지)</h3>
          <ol>
            <li>이용자는 언제든지 회원 탈퇴를 요청할 수 있으며, 회사는 관련 절차를 따라 처리합니다.</li>
            <li>회사는 이용자가 본 약관을 위반하는 경우 계약을 해지할 수 있습니다.</li>
          </ol>

          <h3>제 7조 (책임의 한계)</h3>
          <ol>
            <li>회사는 서비스의 이용과 관련하여 일어나는 문제에 대한 어떠한 책임도 부담하지 않습니다.</li>
            <li>이용자 간의 합의나 서비스를 통한 팀 구성에 관한 모든 책임은 이용자에게 있습니다.</li>
          </ol>

          <h3>제 8조 (준거법 및 분쟁해결)</h3>
          본 약관의 해석 및 적용에 관한 사항은 대한민국의 법령을 따릅니다. 본 약관으로 발생한 분쟁에 대해서는 회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.

          <h3>제 9조 (약관의 변경)</h3>
          회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내에 공지함으로써 효력을 발생합니다.

          위 이용약관을 숙지하고 동의합니다.
        </div>
        <label>
          <input type='checkbox'
                 checked={isTermsAgree}
                 onChange={e => setIsTermsAgree(e.target.checked)}/>
          서비스 이용약관에 동의 합니다
        </label>

        <h2>개인정보처리방침</h2>
        <div className='scroll_layout'>
          Match-UP 팀원 매칭 플랫폼 ('서비스')은 이용자의 개인정보를 중요하게 생각하며, 개인정보 보호법 및 관련 법규를 준수하고 있습니다. 아래 개인정보 처리방침을 통해 개인정보의 수집, 이용, 보관, 제공 등에 대한 내용을 안내합니다.

          <ol>
            <li><h3>수집하는 개인정보의 항목 및 목적</h3></li>
            <ul>
              <li>회사는 서비스 이용을 위해 최소한의 개인정보를 수집합니다.</li>
              <li>수집하는 개인정보 항목: 이름, 이메일 주소, 연락처 등</li>
              <li>개인정보의 수집 및 이용 목적: 서비스 제공, 연락 및 공지사항 전달 등</li>
            </ul>

            <li><h3>개인정보의 보관 및 이용기간</h3></li>
            <ul>
              <li>개인정보는 서비스 이용기간 동안에 한하여 보관 및 이용되며, 이후 필요한 경우에만 보관합니다.</li>
            </ul>

            <li><h3>개인정보의 제공 및 공유</h3></li>
            <ul>
              <li>회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.</li>
            </ul>

            <li><h3>개인정보의 보안 조치</h3></li>
            <ul>
              <li>회사는 개인정보 보호를 위해 기술적, 관리적 조치를 취하며, 개인정보의 누출 및 변조를 방지합니다.</li>
            </ul>

            <li><h3>이용자의 권리와 행사 방법</h3></li>
            <ul>
              <li>이용자는 자신의 개인정보에 대한 열람, 수정, 삭제를 요청할 수 있습니다.</li>
              <li>개인정보 관련 문의 및 요청은 회사의 고객센터를 통해 가능합니다.</li>
            </ul>
          </ol>

          위 개인정보 처리방침을 숙지하고 동의합니다.

          (이하 개인정보 처리방침의 상세 내용은 회사 웹사이트 내에서 확인 가능합니다.)

          위 내용을 확인하고 동의합니다.
        </div>
        <label>
          <input type='checkbox'
                 checked={isPrivacyAgree}
                 onChange={e => setIsPrivacyAgree(e.target.checked)}/>
          서비스 이용약관에 동의 합니다
        </label>

        <label>
          <input type='checkbox'
                 checked={isAgree}
                 onChange={e => {
                   setIsTermsAgree(e.target.checked);
                   setIsPrivacyAgree(e.target.checked);
                   setIsAgree(e.target.checked);
                 }} />
          <strong>전체 동의 하기</strong>
        </label>

        <button onClick={() => {
          setPage(1);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
                disabled={!isAgree}>
          동의하고 다음으로 넘어가기
        </button>
      </div>

      <div className={'additional_info_layout' + (page !== 1 ? ' invisible' : '')}>

        <h2>positionLevel</h2>
        <input type='number'
               value={additionalInfo.positionLevel.toString()}
               onChange={e => setAdditionalInfo(prev => ({...prev, positionLevel: parseInt(e.target.value)}))}/>

        <h2>생일</h2>
        <div className='inputs_layout'>
          <SelectBox options={Array.from({length:70}, (_, i) => (i+1960).toString())}
                     value={additionalInfo.userBirthdayYear.toString()}
                     onChange={value => setAdditionalInfo(prev => ({...prev, userBirthdayYear: parseInt(value)}))}
                     hasDefault={false}/>
          <SelectBox options={Array.from({length:12}, (_, i) => (i+1).toString())}
                     value={additionalInfo.userBirthdayMonth.toString()}
                     onChange={value => setAdditionalInfo(prev => ({...prev, userBirthdayMonth: parseInt(value)}))}
                     hasDefault={false}/>
          <SelectBox options={Array.from({length:31}, (_, i) => (i+1).toString())}
                     value={additionalInfo.userBirthdayDay.toString()}
                     onChange={value => setAdditionalInfo(prev => ({...prev, userBirthdayDay: parseInt(value)}))}
                     hasDefault={false}/>
        </div>

        <h2>userLevel</h2>
        <input type='number'
               value={additionalInfo.userLevel.toString()}
               onChange={e => setAdditionalInfo(prev => ({...prev, userLevel: parseInt(e.target.value)}))}/>

        <h2>거주지 주소</h2>
        <div className='inputs_layout'>
          <SelectBox options={LocationNames}
                     value={additionalInfo.address}
                     onChange={value => setAdditionalInfo(prev => ({...prev, address: value}))}
                     hasDefault={false}/>
        </div>

        <h2>expYear</h2>
        <input type='number'
               value={additionalInfo.expYear.toString()}
               onChange={e => setAdditionalInfo(prev => ({...prev, expYear: parseInt(e.target.value)}))}/>

        <h2>expertize</h2>
        <input type='text' />


        <h2>미팅 선호 타입</h2>
        <SelectBox options={['온라인', '오프라인']}
                   value={additionalInfo.meetingType}
                   onChange={value => setAdditionalInfo(prev => ({...prev, meetingType: value}))}
                   hasDefault={false}/>

        <h2>position</h2>
        <input type='text'
               value={additionalInfo.position}
               onChange={e => setAdditionalInfo(prev => ({...prev, position: e.target.value}))}/>

        <div className='submit_button_layout'>
          <button className='cancel'
            onClick={() => {
              setPage(0);
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}>이전으로</button>

          <button onClick={saveAdditionalInfo}
                  disabled={isSubmitting}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInTerms;