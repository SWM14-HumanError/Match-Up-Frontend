import {useEffect, useState} from 'react';
import {IMyPageEdit} from '../../constant/interfaces.ts';
import SelectBox from './SelectBox.tsx';

interface IProps {
  className?: string;
  setData: (data: IMyPageEdit['Link']) => void;
}

interface IData {
  linkTypeIndex: number;
  linkUrl: string;
}

const LinkTypes = ['github', 'kakao', 'discord', 'email', 'else'];
const LinkTypesTitle = ['Github', 'Kakao', 'Discord', 'Email', 'Else'];

function SelectLinkList({className='', setData}: IProps) {
  const [links, setLinks] = useState<IData[]>([]);

  useEffect(() => {
    let updatedLinks = links.filter((value) => !!value.linkUrl);
    updatedLinks.push({linkTypeIndex: 0, linkUrl: ''});

    const prevLinksLength = links.length;
    const updatedLinksLength = updatedLinks.length;

    if (prevLinksLength !== updatedLinksLength)
      setLinks(updatedLinks);

    let result: IMyPageEdit['Link'] = {};

    links.forEach((link) => {
      if (link.linkTypeIndex !== 0)
        result[LinkTypes[link.linkTypeIndex]] = link.linkUrl;
    });
    setData(result);

  }, [links]);

  function deleteStack(index: number) {
    setLinks(prev => prev.filter((_, i) => i !== index));
  }

  function setStack(index: number, data: IData) {
    setLinks(prev => prev.map((value, i) => i === index ? data : value));
  }

  return (
    <ul className={className}>
      {links.map((value, index) => (
        <LinkSelectBox key={index}
                       data={value}
                       setData={data => setStack(index, data)}
                       deleteStack={() => deleteStack(index)}/>
      ))}
    </ul>
  );
}

interface ILinkBoxProps {
  data: IData;
  setData: (data: IData) => void;
  deleteStack: () => void;
}
function LinkSelectBox({data, setData, deleteStack}: ILinkBoxProps) {
  return (
    <li className='inputs_layout'>
      <SelectBox options={LinkTypesTitle}
                 hasDefault={false}
                 value={LinkTypesTitle[data.linkTypeIndex]}
                 onChange={value => setData({
                   ...data,
                   linkTypeIndex: LinkTypesTitle.indexOf(value)
                 })} />
      <input type='text'
             placeholder='링크를 입력하세요'
              value={data.linkUrl}
              onChange={e => setData({
                ...data,
                linkUrl: e.target.value,
              })} />

      { data.linkUrl && (
        <button className='stack' onClick={deleteStack}>삭제하기</button>
      )}
    </li>
  );
}

export default SelectLinkList;