import { FC, useState } from 'react';
import style from './style.css';

const Operation: FC<any> = (props) => {
  const {  } = props

  const [rotation, setRotation] = useState(0);



  return (
    <div className={style['operation-area']}>
    {/* 图片旋转 */}

    <div className={style['operation-image']}>
      <span>图片旋转:</span>
      <input
        type="range"
        min="0"
        max="360"
        value={rotation}
        onChange={(e) => setRotation(Number(e.target.value))}
        style={{ marginBottom: '10px' }}
      />
    </div>

    <div className={style['operation-pen']}>
      <label>
        <input
          type="checkbox"
          checked={isSelectPen} // 绑定 checkbox 的选中状态
          onChange={handleCheckboxChange} // 设置改变事件处理器
        />
        开始绘画
      </label>
      <button type="button" onClick={toggleEraser} style={{ marginLeft: '10px' }}>
        {eraserEnabled ? 'Switch to Brush' : 'Switch to Eraser'}
      </button>
    </div>
  </div>
  )
}

export default Operation