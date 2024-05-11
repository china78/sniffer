import SplitPane from 'react-split-pane';
import FooterContainer from '../components/FooterContainer';

export default function History () {
  return (
    <div>
      <SplitPane split="vertical" defaultSize={300} primary="first" minSize={250} maxSize={300}>
        <div style={{ width: '100%' }}>
          <div style={{ width: '100%', backgroundColor: 'blue' }}>123</div>
          <FooterContainer />
        </div>
        <div>456</div>
      </SplitPane>
    </div>
  )
}