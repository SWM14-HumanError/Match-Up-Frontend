import {useEffect, useState} from 'react';
import {IMyPageEdit} from '../../constant/interfaces.ts';
import SelectBox from './SelectBox.tsx';

interface IProps {
  className?: string;
  value: IMyPageEdit['link'];
  setData: (data: IMyPageEdit['link']) => void;
}

interface IData {
  linkName: string;
  linkUrl: string;
}

interface ITitles {
  [key: string]: string | undefined;
}

const LinkTitles: ITitles = {
  'github': 'Github',
  'kakao': 'Kakao',
  'discord': 'Discord',
  'email': 'Email',
}
const LinkTypes = Object.keys(LinkTitles);

function SelectLinkList({className='', value, setData}: IProps) {
  const [links, setLinks] = useState<IData[]>([]);

  // value -> links 파싱 -> links와 같으면 pass
  useEffect(() => {
    if (!value) return;

    let updatedLinks: IData[] = [];
    Object.keys(value).forEach((linkType) => {
      const key = linkType.toLowerCase();
      const index = LinkTypes.indexOf(key);

      if (value[linkType] && index !== -1)
        updatedLinks.push({linkName: linkType, linkUrl: value[linkType] as string});
    });
    const nextName = getNextLinkName(updatedLinks);
    if (nextName)
        updatedLinks.push({linkName: nextName, linkUrl: ''});

    if (links.length !== updatedLinks.length)
      setLinks(updatedLinks);

  }, [value]);

  useEffect(() => {
    let updatedLinks = links.filter((value) => !!value.linkUrl);
    const nextName = getNextLinkName(updatedLinks);
    if (nextName)
      updatedLinks.push({linkName: nextName, linkUrl: ''});

    const prevLinksLength = links.length;
    const updatedLinksLength = updatedLinks.length;

    if (prevLinksLength !== updatedLinksLength)
      setLinks(updatedLinks);

    let result: IMyPageEdit['link'] = {};

    links.forEach((link) => {
      if (link.linkUrl) result[link.linkName] = link.linkUrl;
    });
    setData(result);

  }, [links]);

  function getNextLinkName(links: IData[]) {
    const availableNames = LinkTypes.find(name => !links.some(l => l.linkName === name));
    return availableNames ? availableNames : '';
  }

  function deleteStack(index: number) {
    setLinks(prev => prev.filter((_, i) => i !== index));
  }

  function setStack(index: number, data: IData) {
    setLinks(prev => prev.map((value, i) => i === index ? data : value));
  }

  return (
    <ul className={className}>
      {links.map((_, index) => (
        <LinkSelectBox key={index}
                       links={links}
                       index={index}
                       setLinks={data => setStack(index, data)}
                       deleteStack={() => deleteStack(index)}/>
      ))}
    </ul>
  );
}

interface ILinkBoxProps {
  links: IData[];
  index: number;
  setLinks: (data: IData) => void;
  deleteStack: () => void;
}
function LinkSelectBox({links, index, setLinks, deleteStack}: ILinkBoxProps) {
  const [AvailableTitles, setAvailableTitles] = useState<string[]>([]);

  useEffect(() => {
    setAvailableTitles(
      LinkTypes.filter(name =>
        links[index].linkName === name || !links.some(l => l.linkName === name))
        .map(v => LinkTitles[v] as string)
    );
  }, [links, links[index].linkName]);
  return (
    <li className='inputs_layout'>
      <SelectBox options={AvailableTitles}
                 hasDefault={false}
                 value={LinkTitles[links[index].linkName]}
                 onChange={value => setLinks({
                   ...links[index],
                   linkName: LinkTypes.find(v => LinkTitles[v] === value) as string
                 })} />
      <input type='text'
             placeholder='링크를 입력하세요'
             value={links[index].linkUrl}
             onChange={e => setLinks({
               ...links[index],
               linkUrl: e.target.value,
             })} />

      { links[index].linkUrl && (
        <button className='stack' onClick={deleteStack}>삭제하기</button>
      )}
    </li>
  );
}

export default SelectLinkList;