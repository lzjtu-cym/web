import { Icon, notification } from 'antd';

export function customNotice({type, message, description, duration = 3}) {
  notification.config({
    top: 75
  });
  if (type === 'success') {
    notification.success({
      icon: <Icon type='check-cricle' style={{color: '#52c41a'}} />,
      message,
      description,
      duration,
      style: {
        backgroundColor: '#f6ffed',
        border: '1px solid #b7eb8f',
      }
    });
  } else if (type === 'error') {
    notification.success({
      icon: <Icon type='close-cricle' style={{color: '#da350f'}} />,
      message,
      description,
      duration,
      style: {
        backgroundColor: '#fff1f0',
        border: '1px solid #ffa39e',
      }
    });
  } else {
    notification.success({
      icon: <Icon type='info-cricle' style={{color: '#1890ff'}} />,
      message,
      description,
      duration,
      style: {
        backgroundColor: '#e6f7ff',
        border: '1px solid #91d5ff',
      }
    });
  }
}
