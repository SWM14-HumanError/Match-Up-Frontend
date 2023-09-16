import React, {useEffect, useRef, useState} from 'react';
import Camera from '../svgs/Camera.tsx';

import '../../styles/components/ImgUpload.scss';

interface IImgUpload {
  setBase64: React.Dispatch<React.SetStateAction<string | null>>
}

function ImgUpload({setBase64}: IImgUpload) {
  const FileInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setBase64(reader.result as string);
    };
  }, [selectedFile]);

  return (
    <div className='upload_layout'>
      <div className='upload_image' onClick={() => FileInput.current?.click()}>
        { !!selectedFile ? (
          <img src={URL.createObjectURL(selectedFile)} alt=''/>
        ) : (
          <div className='upload_demo'>
            <Camera/>
          </div>
        )}
        <input type='file' accept='image/*' ref={FileInput} onChange={e => {
          setSelectedFile(!!e.target.files ? e.target.files[0] : null);
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