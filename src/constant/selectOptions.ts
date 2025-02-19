// export const LocationNames = ['서울', '경기', '인천', '대전', '충북', '충남', '부산', '울산', '경북', '경남', '대구', '광주', '전북', '전남', '제주', '강원'];
import {IOption} from '@components/inputs/SelectBox.tsx';

export const ProjectRecruitFields = ['분야 전체', '프론트엔드', '백엔드', '풀스택', '안드로이드', 'iOS', '머신러닝', '게임', '임베디드', '블록체인', '기타'];
export const ProjectFields = ['분야 전체', '웹', '모바일 앱', '데스크톱 앱', '임베디드 시스템', 'AI', '게임', '로봇', '하드웨어', 'VR / AR', '기타'];
// export const ProjectSubFields = ['분류 전체', '건강 및 피트니스', '교육 및 학습', '여행 및 지역 정보', '음식 및 요리', '사회 문제 해결', '엔터테인먼트', '쇼핑 및 전자상거래', '자기 계발 및 멘토링', '뉴스 및 미디어', '기술 및 혁신', '기타'];
export const ProjectSubFields = ['전체', '건강', '교육', '여행', '음식', '사회', '과학', '기술', '환경', '문화', '경제', '기타'];

export const BigTechTypeEn =['PLAN', 'UI_UX', 'FE', 'BE', 'APP', 'GAME', 'AI', 'ETC'];
export const BigTechTypeKo = ['기획', 'UI/UX', '프론트엔드', '백엔드', '앱', '게임', 'AI', '기타'];
export const TechTypeOptions: Array<IOption<string>> = [
  {option: '직무 전체', value: ''},
  {option: '기획', value: 'PLAN'},
  {option: 'UI/UX', value: 'UI_UX'},
  {option: '프론트엔드', value: 'FE'},
  {option: '백엔드', value: 'BE'},
  {option: '앱', value: 'APP'},
  {option: '게임', value: 'GAME'},
  {option: 'AI', value: 'AI'},
  {option: '기타', value: 'ETC'},
];
export const TechTypeRecord: Record<string, string> = option2Record(TechTypeOptions);


export const CareerOptions = ['주니어', '미들', '시니어'];

export const MeetingTypes = [
  {option: '온라인', value: 'ONLINE'},
  {option: '오프라인', value: 'OFFLINE'},
  {option: '상관없음', value: 'FREE'},
];
export const MeetingTypeRecord = option2Record(MeetingTypes);

// Todo: Select-Option 용 데이터 만들기
// 기업 공고 모집 분야 Options
export const JobPositionOptions: Array<IOption<string>> = [
  {option: '분야 전체', value: ''},
  {option: '프론트엔드', value: 'FRONTEND'},
  {option: '백엔드', value: 'BACKEND'},
  {option: '풀스택', value: 'FULLSTACK'},
  {option: '데브옵스', value: 'DEVOPS'},
  {option: 'IOS', value: 'IOS'},
  {option: '안드로이드', value: 'ANDROID'},
  {option: '모바일', value: 'MOBILE'},
  {option: 'AI', value: 'AI'},
  {option: '데이터', value: 'DATA'},
  {option: '디자이너', value: 'DESIGNER'},
  {option: 'PM', value: 'PM'},
  {option: '마케팅', value: 'MARKETING'},
  {option: '비즈니스', value: 'BUSINESS'},
  {option: '기타', value: 'ETC'},
];

export const JobPositionRecord = option2Record(JobPositionOptions);

// 기업 공고 모집 경력 Options
export const JobTypeOptions: Array<IOption<string>> = [
  {option: '경력 전체', value: ''},
  {option: '부트캠프', value: 'BOOTCAMP'},
  {option: '인턴', value: 'INTERN'},
  {option: '신입', value: 'NEWBIE'},
  {option: '주니어', value: 'JUNIOR'},
  {option: '미들', value: 'MIDDLE'},
  {option: '시니어', value: 'SENIOR'},
  {option: '기타', value: 'ETC'},
];

export const JobTypeRecord = option2Record(JobTypeOptions);

export const HideClosedJobOptions: Array<IOption<boolean>> = [
  {option: '모든 공고 보기', value: false},
  {option: '마감된 공고 가리기', value: true},
];

// export const KoreaLocation = {
//   '서울': ['강남구', '강동구', '강북구', '강서구', '관악구',
//     '광진구', '구로구', '금천구', '노원구', '도봉구',
//     '동대문구', '동작구', '마포구', '서대문구', '서초구',
//     '성동구', '성북구', '송파구', '양천구', '영등포구',
//     '용산구', '은평구', '종로구', '중구', '중랑구'],
//   '경기': ['가평군', '고양시', '과천시', '광명시', '광주시',
//     '구리시', '군포시', '김포시', '남양주시', '동두천시',
//     '부천시', '성남시', '수원시', '시흥시', '안산시',
//     '안성시', '안양시', '양주시', '양평군', '여주시',
//     '연천군', '오산시', '용인시', '의왕시', '의정부시',
//     '이천시', '파주시', '평택시', '포천시', '하남시',
//     '화성시'],
//   '인천': ['강화군', '계양구', '남구', '남동구', '동구',
//     '부평구', '서구', '연수구', '옹진군', '중구'],
//   '강원': ['강릉시', '고성군', '동해시', '삼척시', '속초시',
//     '양구군', '양양군', '영월군', '원주시', '인제군',
//     '정선군', '철원군', '춘천시', '태백시', '평창군',
//     '홍천군', '화천군', '횡성군'],
//   '충북': ['괴산군', '단양군', '보은군', '영동군', '옥천군',
//     '음성군', '제천시', '증평군', '진천군', '청주시',
//     '충주시'],
//   '충남': ['계룡시', '공주시', '금산군', '논산시', '당진시',
//     '보령시', '부여군', '서산시', '서천군', '아산시',
//     '예산군', '천안시', '청양군', '태안군', '홍성군'],
//   '대전': ['대덕구', '동구', '서구', '유성구', '중구'],
//   '경북': ['경산시', '경주시', '고령군', '구미시', '군위군',
//     '김천시', '문경시', '봉화군', '상주시', '성주군',
//     '안동시', '영덕군', '영양군', '영주시', '영천시',
//     '예천군', '울릉군', '울진군', '의성군', '청도군',
//     '청송군', '칠곡군', '포항시'],
//   '대구': ['남구', '달서구', '달성군', '동구', '북구',
//     '서구', '수성구', '중구'],
//   '경남': ['거제시', '거창군', '고성군', '김해시', '남해군',
//     '밀양시', '사천시', '산청군', '양산시', '의령군',
//     '진주시', '창녕군', '창원시', '통영시', '하동군',
//     '함안군', '함양군', '합천군'],
//   '울산': ['남구', '동구', '북구', '울주군', '중구'],
//   '부산': ['강서구', '금정구', '기장군', '남구', '동구',
//     '동래구', '부산진구', '북구', '사상구', '사하구',
//     '서구', '수영구', '연제구', '영도구', '중구',
//     '해운대구'],
//   '전북': ['고창군', '군산시', '김제시', '남원시', '무주군',
//     '부안군', '순창군', '완주군', '익산시', '임실군',
//     '장수군', '전주시', '정읍시', '진안군'],
//   '전남': ['강진군', '고흥군', '곡성군', '광양시', '구례군',
//     '나주시', '담양군', '목포시', '무안군', '보성군',
//     '순천시', '신안군', '여수시', '영광군', '영암군',
//     '완도군', '장성군', '장흥군', '진도군', '함평군',
//     '해남군', '화순군'],
//   '제주': ['서귀포시', '제주시'],
// };

export function option2Record(options: Array<IOption<string>>): Record<string, string> {
  return options.reduce((acc, curr) => {
    acc[curr.value] = curr.option;
    return acc;
  }, {} as Record<string, string>);
}