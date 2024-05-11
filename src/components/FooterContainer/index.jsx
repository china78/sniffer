import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function FooterContainer() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <Button block onClick={() => navigate('/')}>历史</Button>
      <Button type='primary' block style={{ margin: '0px 5px' }}>嗅探</Button>
      <Button block onClick={() => navigate('/more')}>更多</Button>
    </div>
  )
}