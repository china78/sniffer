import { useState, useRef, useEffect } from 'react';
import { List } from 'antd'; 
import SplitPane from 'react-split-pane';
import { useSelector, useDispatch } from 'react-redux';
import { setSniff, getSniffData } from '../features/sniff/sniffSlice';

export default function History ({ footer }) {
  const listEndRef = useRef(null);
  const sniffData = useSelector(getSniffData);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSniff = (value) => {
      console.log('--- value ---: ', value)
      dispatch(setSniff(value))
    }
    window?.electronAPI?.receiveSnifferData(handleSniff);
    return () => {
      window?.electronAPI?.removeSnifferListener(handleSniff);
    };
  }, [])

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sniffData]);

  return (
    <SplitPane style={{ height: 'calc(100vh - 39px)' }} split="vertical" defaultSize={'50%'} primary="first" minSize={250} maxSize={500}>
      <div style={{ width: '100%' }}>
        <div style={{ width: '100%', height: 'calc(100vh - 108px)', overflow: 'auto' }}>
          <List
            dataSource={sniffData}
            renderItem={item => (
              <List.Item>{item}</List.Item>
            )}
          />
          <div ref={listEndRef} />
        </div>
        { footer }
      </div>
      <div>456</div>
    </SplitPane>
  )
}