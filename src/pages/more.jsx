import SplitPane from 'react-split-pane';

export default function More ({ footer }) {
  return (
    <SplitPane style={{ height: 'calc(100vh - 39px)' }} split="vertical" defaultSize={'50%'} primary="first" minSize={250} maxSize={500}>
      <div style={{ width: '100%' }}>
        <div>more</div>
        { footer }
      </div>
      <div>..</div>
    </SplitPane>
  )
}