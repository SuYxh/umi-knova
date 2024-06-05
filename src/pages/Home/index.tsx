import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
// import Base from './components/Base';
import styles from './index.less';

import ImgRotation from './editor/ImgRotation';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />

        {/* <Base /> */}

        {/* <PicEditor></PicEditor> */}
        <ImgRotation></ImgRotation>
      </div>
    </PageContainer>
  );
};

export default HomePage;
