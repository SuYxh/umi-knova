import { PageContainer } from '@ant-design/pro-components';

import MultiLine from './components/MultiLine';
// import SingleLine from './components/SingleLine';
import styles from './index.less';

const HomePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        {/* <SingleLine /> */}

        <br />
        <br />
        <br />

        <MultiLine />

        <br />
        <br />
        <br />
      </div>
    </PageContainer>
  );
};

export default HomePage;
