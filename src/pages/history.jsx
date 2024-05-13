import SplitPane from 'react-split-pane';

export default function History ({ footer }) {
  return (
    <div>
      <SplitPane split="vertical" defaultSize={300} primary="first" minSize={250} maxSize={300}>
        <div style={{ width: '100%' }}>
          <div style={{ width: '100%', backgroundColor: 'blue' }}>123</div>
          { footer }
        </div>
        <div>456</div>
      </SplitPane>
    </div>
  )
}