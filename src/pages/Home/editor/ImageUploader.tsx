import React, { useCallback,useState } from 'react';

interface ImageUploaderProps {
  onImageAdd: (src: string) => void; // 接受图像URL，而不是图像对象
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageAdd }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImageUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleImageUrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  }, []);

  const handleAddImageToCanvas = useCallback(() => {
    if (imageUrl) {
      onImageAdd(imageUrl);
    }
  }, [imageUrl, onImageAdd]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input type="text" placeholder="Enter image URL" value={imageUrl} onChange={handleImageUrlChange} />
      <button onClick={handleAddImageToCanvas}>Add Image to Canvas</button>
    </div>
  );
};
