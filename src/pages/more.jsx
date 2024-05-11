import { Button } from 'antd';
import SplitPane from 'react-split-pane';
import { useNavigate } from 'react-router-dom';
import FooterContainer from '../components/FooterContainer';

export default function More () {
  const navigate = useNavigate();
  return (
    <div>
      <SplitPane split="vertical" defaultSize={300} primary="first" minSize={250} maxSize={300}>
        <div style={{ width: '100%' }}>
          <div>more</div>
          <FooterContainer />
        </div>
        <div>..</div>
      </SplitPane>
    </div>
  )
}