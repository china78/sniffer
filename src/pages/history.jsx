import { useState, useRef, useEffect } from 'react';
import { Table } from 'antd'; 
import SplitPane from 'react-split-pane';
import { useSelector, useDispatch } from 'react-redux';
import { setSniff, getSniffData } from '../features/sniff/sniffSlice';


const columns = [
  { title: 'No', dataIndex: 'No', key: 'No' },
  { title: 'Time', dataIndex: 'Time', key: 'Time' },
  { title: 'Source', dataIndex: 'Source', key: 'Source' },
  { title: 'Destination', dataIndex: 'Destination', key: 'Destination' },
  { title: 'Protocol', dataIndex: 'Protocol', key: 'Protocol' },
  { title: 'Length', dataIndex: 'Length', key: 'Length' },
  { title: 'Info', dataIndex: 'Info', key: 'Info' },
];

export default function History ({ footer }) {
  const listEndRef = useRef(null);
  const sniffData = useSelector(getSniffData);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSniff = (values) => {
      values.forEach(value => {
        if (value.startsWith("DATA:")) {
          try {
            const validData = JSON.parse(value.substring(5)); // 去掉前缀 "DATA:"
            dispatch(setSniff(validData));
          } catch (error) {
            console.error('Error parsing JSON data:', error);
          }
        }
      });
    }
    window?.electronAPI?.receiveSnifferData(handleSniff);
    return () => {
      window?.electronAPI?.offSniffData();
    };
  }, [])

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sniffData]);
  console.log('-- sniffData --: ', sniffData);
  return (
    <SplitPane style={{ height: 'calc(100vh - 39px)' }} split="vertical" defaultSize={'50%'} primary="first" minSize={250}>
      <div style={{ width: '100%' }}>
        <div style={{ width: '100%', height: 'calc(100vh - 108px)', overflow: 'auto' }}>
          <Table columns={columns} dataSource={sniffData} pagination={false} />
          <div ref={listEndRef} />
        </div>
        { footer }
      </div>
      <div>456</div>
    </SplitPane>
  )
}