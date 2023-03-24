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