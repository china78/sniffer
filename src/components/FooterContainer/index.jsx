import { Button, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TinyColor } from '@ctrl/tinycolor';
import { useSelector, useDispatch } from 'react-redux';
import { getSmelling, setSmelling } from '../../features/footer/footerSlice';
import './index.css';

export default function FooterContainer() {
  const navigate = useNavigate();
  const smelling = useSelector(getSmelling);
  const dispatch = useDispatch();

  const colors1 = ['#6253E1', '#04BEFE'];
  const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];

  const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  const colors = !smelling ? colors1 : colors2;

  function handleSmell() {
    dispatch(setSmelling());
  }

  return (
    <div className="footer">
      <Button size='small' block onClick={() => navigate('/')}>历史</Button>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(135deg, ${colors.join(', ')})`,
              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors).join(', ')})`,
              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors).join(', ')})`,
              lineWidth: 0,
            },
          },
        }}
      >
        <Button
          size='small'
          type='primary'
          block
          style={{ margin: '0px 5px' }}
          onClick={handleSmell}
        >
          嗅探
        </Button>
      </ConfigProvider>
      <Button size='small' block onClick={() => navigate('/more')}>更多</Button>
    </div>
  )
}