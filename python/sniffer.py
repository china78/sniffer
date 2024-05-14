# commadn + shift + p
# Python: Select Interpreter
# python 3.10.9
import sys
from scapy.all import AsyncSniffer
from scapy.all import sniff

# 标志位，用于控制是否停止嗅探
sniffer = None

def packet_handler(pkt):
    print(pkt.summary())

def start_sniffing():
    global sniffer
    print('开始嗅探')
    sniffer = AsyncSniffer(prn=packet_handler)
    sniffer.start()
    # sniff(prn=lambda x: x.summary())

def stop_sniffing():
    global sniffer
    print('停止嗅探')
    if sniffer:
        sniffer.stop()

# 监听标准输入流
for line in sys.stdin:
    line = line.strip()
    if line == 'start_sniffing':
        start_sniffing()
    elif line == 'stop_sniffing':
        stop_sniffing()