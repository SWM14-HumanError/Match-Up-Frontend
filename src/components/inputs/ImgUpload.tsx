import React, {useEffect, useRef, useState} from 'react';
import Camera from '../svgs/Camera.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';

import '../../styles/components/ImgUpload.scss';

interface IImgUpload {
  prevImgUrl: string | null;
  base64Img: string | null;
  setBase64: React.Dispatch<React.SetStateAction<string | null>>;
}

function ImgUpload({prevImgUrl, base64Img, setBase64}: IImgUpload) {
  const FileInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!prevImgUrl) return;

    fetch(prevImgUrl)
      .then(response => response.blob()) // 이미지를 Blob 형태로 다운로드
      .then(blob => setBase64Data(blob))
      .catch(error => console.error('이미지 다운로드 및 변환 중 오류 발생:', error));
  }, [prevImgUrl]);

  useEffect(() => {
    if (selectedFile) setBase64Data(selectedFile);
  }, [selectedFile]);

  function setBase64Data(fileOrBlob: File | Blob) {
    const reader = new FileReader();

    reader.readAsDataURL(fileOrBlob);
    reader.onloadend = () => {
      setBase64(reader.result as string);
    };
  }

  function deleteSelected(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setSelectedFile(null);
    setBase64(null);
  }

  return (
    <div className='upload_layout'>
      <div className='upload_image' onClick={() => FileInput.current?.click()}>
        { !!base64Img ? (
          <div className='upload_img_layout'>
            <img src={base64Img ? base64Img : ''} alt=''/>
            <button className='image_button' onClick={deleteSelected}><CloseIcon/></button>
          </div>
        ) : (
          <div className='upload_demo'>
            <Camera/>
          </div>
        )}
        <input type='file' accept='image/*' ref={FileInput} onChange={e => {
          setSelectedFile(prev => !!e.target.files?.length ? e.target.files[0] : prev);
        }}/>
      </div>
      <p>
        프로젝트에 관한 이미지를 첨부 <br/>
        최대 100MB까지 첨부가능해요. <br/>
        (JPG, PNG, GIF 가능)
      </p>
    </div>
  );
}

export default ImgUpload;