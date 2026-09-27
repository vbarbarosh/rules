- bin/configure sets up the whole environment; I run it and it does everything
- sometimes it needs sudo
- every question it may have (sudo password included) is asked at the very start, before any work
- once the work has started, no more questions; everything is considered settled
- never: started, working, then stuck halfway waiting for a sudo password
- e.g. electron: the downloaded chrome-sandbox needs its attributes set through sudo
    - configure checks for it at the very start; not there yet -> sudo will be needed -> ask for it at the start


# bin/configure

`bin/configure` makes a checkout ready in one run. Whatever the project needs
it does itself, including the steps that need `sudo`.

## Questions come first

Every question the script may ask — the `sudo` password, a choice, a key — is
asked at the very start, before any work. Once the work has started there are
no more questions: everything is settled. The script never stops halfway,
waiting for a password.

So the script first works out what the run will need. When a step will need
`sudo`, it takes it up front with `sudo -v`, and the later `sudo` calls reuse
it.

## Example: Electron

Electron's downloaded `chrome-sandbox` has to be owned by root with mode 4755,
set through `sudo`. The script checks it at the start; when the file is not
there yet, or not set that way, `sudo` will be needed, so it is asked for
right away:

```bash
sandbox=node_modules/electron/dist/chrome-sandbox
if [ "`stat -c %U:%a $sandbox 2>/dev/null`" != "root:4755" ]; then
    sudo -v
fi

npm install

if [ "`stat -c %U:%a $sandbox`" != "root:4755" ]; then
    sudo chown root:root $sandbox
    sudo chmod 4755 $sandbox
fi
```

The check has to predict the state after the install: `npm ci` removes
`node_modules`, so a script that runs it always needs `sudo` for the sandbox.

`sudo -v` holds for 15 minutes by default. When the run can take longer, the
script keeps it fresh in the background, so no prompt shows up later:

```bash
sudo -v
while sleep 60; do sudo -n true; done 2>/dev/null &
keepalive=$!
trap 'kill $keepalive; rm -rf $tempdir; echo -e "$EXIT_MESSAGE"' EXIT
```
