import { Line } from '@ant-design/plots';
import { useEffect, useState } from 'react';

import styles from './index.less';

const SingleLine: React.FC = () => {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
    )
      .then((response) => response.json())
      .then((json) => {
        console.log('SingleLine', json);
        setData(json);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };
  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      <Line {...config} />
    </div>
  );
};

export default SingleLine;
