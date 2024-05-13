import SplitPane from 'react-split-pane';

export default function More ({ footer }) {
  return (
    <div>
      <SplitPane split="vertical" defaultSize={300} primary="first" minSize={250} maxSize={300}>
        <div style={{ width: '100%' }}>
          <div>more</div>
          { footer }
        </div>
        <div>..</div>
      </SplitPane>
    </div>
  )
}