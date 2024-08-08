import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import Camera from '../svgs/Camera.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import Alert from '../../constant/Alert.ts';

import '../../styles/components/ImgUpload.scss';

interface IImgUpload {
  messageStart?: string;
  prevImgUrl: string | null;
  setBase64: React.Dispatch<React.SetStateAction<string | null>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

const ImgUpload = forwardRef(({prevImgUrl, setBase64, setFileName, messageStart='프로젝트에'}: IImgUpload, ref) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(prevImgUrl ?? undefined);

  const containerRef = useRef<HTMLDivElement>(null);
  const FileInput = useRef<HTMLInputElement>(null);

  // 외부 ref 와 내부 ref 를 연결
  useImperativeHandle(ref, () => ({
    focus: () => { containerRef.current?.focus(); },
  }));

  // 이미지 url 이 내부 url 도 변경
  useEffect(() => {
    if (prevImgUrl) setImageUrl(prevImgUrl);
  }, [prevImgUrl]);

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      containerRef.current?.click();
    }
  }

  // 이미지 파일 선택 시
  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files && e.target.files.length ? e.target.files[0] : null;

    if (!selectedFile) return;

    if (selectedFile.size > 1024 * 1024) {
      Alert.show('이미지 용량이 너무 큽니다. (최대 1MB)');
      deleteSelected();

      return;
    }

    setImageUrl(URL.createObjectURL(selectedFile));
  }

  function deleteSelected() {
    const fileInput = FileInput.current;
    if (fileInput) fileInput.value = '';

    setImageUrl(undefined);
    setBase64(null);
    setFileName('');
  }

  // 이미지 삭제 버튼 클릭 시
  function onClickDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    deleteSelected();
  }

  // 이미지 Base64 변환
  function onLoaded(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const selectedFile = FileInput.current?.files && FileInput.current.files.length ? FileInput.current.files[0] : null;
    const img = e.target as HTMLImageElement;

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Canvas 에 이미지 그리기
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);

    // Base64 문자열 생성
    const base64String = canvas.toDataURL('image/png');

    // Base64 문자열을 Blob 으로 변환
    const [base64Type, base64] = base64String.split(',');
    const fileType = base64Type.split(';')[0].split('/')[1];
    const fileName = selectedFile ? selectedFile.name : `${Math.floor(Math.random()*987654321)}.${fileType}`;

    setBase64(base64);
    setFileName(fileName);
  }

  return (
    <div className='upload_layout'>
      <div className='upload_image'
           ref={containerRef}
           tabIndex={0}
           onKeyDown={handleKeyPress}
           onClick={() => FileInput.current?.click()}>
        { imageUrl ? (
          <div className='upload_img_layout'>
            <img src={imageUrl} alt=''
                 onLoad={onLoaded}
                 onError={deleteSelected}
                 crossOrigin='anonymous'/>
            <button className='image_button' onClick={onClickDelete}><CloseIcon/></button>
          </div>
        ) : (
          <div className='upload_demo'>
            <Camera/>
          </div>
        )}
        <input type='file'
               accept='image/jpeg,image/png,image/gif'
               ref={FileInput}
               onChange={onChangeFile}/>
      </div>
      <p>
        {messageStart} 관한 이미지를 첨부 <br/>
        최대 1MB까지 첨부가능해요. <br/>
        (JPG, PNG, GIF 가능)
      </p>
    </div>
  );
});

export default ImgUpload;