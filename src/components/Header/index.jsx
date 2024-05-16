import { Button, ConfigProvider } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import { useSelector, useDispatch } from 'react-redux';
import { getSmelling, setSmelling } from '../../features/footer/footerSlice';
import './index.css';
export default function Header() {
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
    <div className="header">
      111
    </div>
  )
}