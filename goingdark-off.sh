#!/bin/bash
#
# GOINGDARK
# Author: RedPen
# License: CC BY-NC 4.0
# https://github.com/Zeus-Chileshe/goingdark
#


echo "[+] Disabling ANON MODE (Returning to normal network)"

# 1. Stop Tor
systemctl stop tor

# 2. Unlock resolv.conf
chattr -i /etc/resolv.conf

# 3. Restore normal DNS resolvers
cat <<EOF > /etc/resolv.conf
nameserver 8.8.8.8
nameserver 1.1.1.1
EOF

# 4. Flush all firewall rules
iptables -F
iptables -t nat -F
iptables -X

# 5. Restart networking
systemctl restart NetworkManager

echo "[✓] ANON MODE DISABLED"
