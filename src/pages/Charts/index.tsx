import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import SingleLine from './components/SingleLine';
import MultiLine from './components/MultiLine';

const HomePage: React.FC = () => {
  
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <SingleLine /> 

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
