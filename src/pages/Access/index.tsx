import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';

import styles from './index.less';

const AccessPage: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <div className={styles.container}>
        <Access accessible={access.canSeeAdmin}>
          <Button>只有 Admin 可以看到这个按钮</Button>
        </Access>
      </div>
    </PageContainer>
  );
};

export default AccessPage;
