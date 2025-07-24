import { Button, Result, Typography } from 'antd';

import styles from './ErrorFallback.module.scss';

const { Paragraph, Text } = Typography;

interface Props {
  error: {
    message: string;
  };
  resetErrorBoundary: () => void;
}

export const Fallback = ({ error, resetErrorBoundary }: Props) => {
  return (
    <Result
      status='error'
      title='Что-то пошло не так'
      className={styles.error}
      subTitle='В приложении произошла непредвиденная ошибка.'
      extra={[
        <Button type='primary' onClick={resetErrorBoundary} key='retry'>
          Перейти на главную
        </Button>,
        <Button onClick={() => window.location.reload()} key='reload'>
          Перезагрузить страницу
        </Button>
      ]}
    >
      <div className={styles.errorText} style={{}}>
        <Paragraph>
          <Text strong>Ошибка:</Text>
          <br />
          <Text type='danger'>{error?.message || 'Неизвестная ошибка'}</Text>
        </Paragraph>
      </div>
    </Result>
  );
};
