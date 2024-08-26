
- gcc and build tools
```bash
sudo apt install build-essential
sudo apt install libssl-dev #OpenSSL
# sudo apt-get install xorg openbox
sudo apt-get install libx11-dev
sudo apt-get -y install libxrandr-dev libxinerama-dev libxcursor-dev libxi-dev
sudo apt-get -y install xorg-dev libglu1-mesa-dev #nanogui
sudo apt-get install python3-dev
```

- Installing Ubuntu Desktop for arm64 using Ubuntu Server ISO
```bash
$ sudo apt update
$ sudo apt install ubuntu-desktop
$ sudo reboot
```

--- 
https://askubuntu.com/questions/151840/how-to-disable-gdm-from-being-automatically-started

For Ubuntu 18.04 this worked for me:
### Disable gdm
This will prevent gdm from loading on boot and login is via console.
`systemctl set-default multi-user.target`
Using this method, gdm can still be started manually with systemctl start gdm
Check the systemd default with
`systemctl get-default`
Usually this will be graphical.target and can be reverted with systemctl set-default graphical.target
Source: https://wiki.debian.org/GDM#systemd