# commadn + shift + p
# Python: Select Interpreter
# python 3.10.9
import sys
import os
import selectors
import json
from scapy.all import AsyncSniffer, IP, IPv6, ARP, TCP, UDP, DNS, ICMP
from scapy.layers.inet6 import ICMPv6EchoRequest, ICMPv6EchoReply

print("Python 脚本已经运行")
sys.stdout.flush()

selector = selectors.DefaultSelector()
sniffer = None
data_counter = 0
protocols = {1: "ICMP", 6: "TCP", 17: "UDP", 58: "ICMPv6"}

def identify_protocol(packet):
    if packet.haslayer(IP):
        proto_num = packet[IP].proto
        return protocols.get(proto_num, str(proto_num))
    elif packet.haslayer(IPv6):
        if packet.haslayer(ICMPv6EchoRequest) or packet.haslayer(ICMPv6EchoReply):
            return "ICMPv6"
        return "IPv6"
    elif packet.haslayer(ARP):
        return "ARP"
    elif packet.haslayer(DNS):
        return "DNS"
    elif packet.haslayer(UDP):
        # Check for QUIC
        if packet[UDP].dport == 443 or packet[UDP].sport == 443:
            return "QUIC"
        return "UDP"
    elif packet.haslayer(ICMP):
        return "ICMP"
    elif packet.haslayer(TCP):
        # Check for TLS
        if packet[TCP].dport == 443 or packet[TCP].sport == 443:
            return "TLS"
        return "TCP"
    return "Unknown"

def start_sniffing():
    global sniffer
    print('开始嗅探')
    sys.stdout.flush()

    # 在桌面上创建一个文件
    # desktop_path = os.path.join(os.path.expanduser("~"), "Desktop")
    # output_file_path = os.path.join(desktop_path, "sniffer_output.txt")

    def packet_handler(packet):
        global data_counter
        data_counter += 1  # 增加计数器
        protocol = identify_protocol(packet)
    
        source = "N/A"
        destination = "N/A"
        
        # 设置源和目的地址
        if packet.haslayer(IP):
            source = packet[IP].src
            destination = packet[IP].dst
        elif packet.haslayer(IPv6):
            source = packet[IPv6].src
            destination = packet[IPv6].dst
        elif packet.haslayer(ARP):
            source = packet[ARP].hwsrc
            destination = packet[ARP].hwdst

        packet_info = {
            "key": data_counter,
            "No": data_counter,
            "Time": packet.time,
            "Source": source,
            "Destination": destination,
            "Protocol": protocol,
            "Length": len(packet),
            "Info": packet.summary(),
            "details": packet.show(dump=True),
        }
        json_data = json.dumps(packet_info)
        print(f"DATA:{json_data}", flush=True)  # 添加前缀 "DATA:" 以便识别有效数据

    sniffer = AsyncSniffer(prn=packet_handler, promisc=True)
    sniffer.start()

def stop_sniffing():
    global sniffer
    print('停止嗅探')
    sys.stdout.flush()
    if sniffer:
        sniffer.stop()
        sniffer = None

def handle_input():
    line = sys.stdin.readline().strip()
    # print(f'Received command: {line}')
    sys.stdout.flush()
    if line == 'start_sniffing':
        start_sniffing()
    elif line == 'stop_sniffing':
        stop_sniffing()

selector.register(sys.stdin, selectors.EVENT_READ, handle_input)

print('Python 子进程启动，等待命令...')
sys.stdout.flush()

while True:
    for key, mask in selector.select():
        callback = key.data
        callback()


