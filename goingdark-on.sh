#!/bin/bash
#
# GOINGDARK
# Author: RedPen
# License: CC BY-NC 4.0
# https://github.com/Zeus-Chileshe/goingdark


echo "[+] Enabling ANON MODE (Tor-enforced)"

# 1. Start Tor
systemctl start tor

# 2. Unlock resolv.conf in case it was locked
chattr -i /etc/resolv.conf 2>/dev/null

# 3. Force DNS to localhost (Tor DNSPort)
echo "nameserver 127.0.0.1" > /etc/resolv.conf

# 4. Lock resolv.conf to prevent leaks
chattr +i /etc/resolv.conf

# 5. Flush existing firewall rules
iptables -F
iptables -t nat -F
iptables -X

# 6. Allow Tor process to communicate
iptables -A OUTPUT -m owner --uid-owner debian-tor -j ACCEPT

# 7. Redirect DNS queries to Tor
iptables -t nat -A OUTPUT -p udp --dport 53 -j REDIRECT --to-ports 5353

# 8. Redirect all TCP traffic to Tor
iptables -t nat -A OUTPUT -p tcp --syn -j REDIRECT --to-ports 9040

# 9. Allow loopback traffic
iptables -A OUTPUT -o lo -j ACCEPT

# 10. Block everything else
iptables -A OUTPUT -j DROP

echo "[✓] ANON MODE ENABLED"
