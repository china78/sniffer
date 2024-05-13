import sys
from scapy.all import sniff
# commadn + shift + p
# Python: Select Interpreter
# python 3.10.9

# 标志位，用于控制是否停止嗅探
stop_sniffing_flag = False

def start_sniffing():
    print('开始嗅探')
    sniff(prn=lambda x: x.summary(), stop_filter=lambda _: stop_sniffing_flag)

def stop_sniffing():
    global stop_sniffing_flag
    print('停止嗅探')
    stop_sniffing_flag = True

# 监听标准输入流
for line in sys.stdin:
    line = line.strip()
    if line == 'start_sniffing':
        start_sniffing()
    elif line == 'stop_sniffing':
        stop_sniffing()