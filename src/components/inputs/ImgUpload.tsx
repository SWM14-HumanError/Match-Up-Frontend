import React, {useEffect, useRef, useState} from 'react';
import Camera from '../svgs/Camera.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import Alert from "../../constant/Alert.ts";

import '../../styles/components/ImgUpload.scss';

interface IImgUpload {
  prevImgUrl: string | null;
  setBase64: React.Dispatch<React.SetStateAction<string | null>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

function ImgUpload({prevImgUrl, setBase64, setFileName}: IImgUpload) {
  const FileInput = useRef<HTMLInputElement>(null);
  const [base64Img, setBase64Img] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!prevImgUrl) return;

    fetch(prevImgUrl)
      .then(response => response.blob()) // 이미지를 Blob 형태로 다운로드
      .then(blob => setBase64Data(blob))
      .catch(error => console.error('이미지 다운로드 및 변환 중 오류 발생:', error));
  }, [prevImgUrl]);

  useEffect(() => {
    if (!selectedFile) return;

    if (selectedFile.size > 1024 * 1024) {
      Alert.show('이미지 용량이 너무 큽니다. (최대 1MB)');
      setSelectedFile(null);
      return;
    }

    setBase64Data(selectedFile);
  }, [selectedFile]);

  function setBase64Data(fileOrBlob: File | Blob) {
    const reader = new FileReader();

    reader.readAsDataURL(fileOrBlob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      setBase64Img(base64data);
      setBase64(base64data.split(',')[1]);
      setFileName(fileOrBlob.name);

      //Todo: blob 도 name이 잘 나오는 지 확인
      console.log(fileOrBlob.name);
    };
  }

  function deleteSelected(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setSelectedFile(null);
    setBase64Img(null);
    setFileName('');
  }

  return (
    <div className='upload_layout'>
      <div className='upload_image' onClick={() => FileInput.current?.click()}>
        { !!base64Img ? (
          <div className='upload_img_layout'>
            <img src={base64Img ? base64Img : ''} alt='' referrerPolicy='no-referrer'/>
            <button className='image_button' onClick={deleteSelected}><CloseIcon/></button>
          </div>
        ) : (
          <div className='upload_demo'>
            <Camera/>
          </div>
        )}
        <input type='file' accept='image/jpeg,image/png,image/gif' ref={FileInput} onChange={e => {
          setSelectedFile(prev => !!e.target.files?.length ? e.target.files[0] : prev);
        }}/>
      </div>
      <p>
        프로젝트에 관한 이미지를 첨부 <br/>
        최대 1MB까지 첨부가능해요. <br/>
        (JPG, PNG, GIF 가능)
      </p>
    </div>
  );
}

export default ImgUpload;