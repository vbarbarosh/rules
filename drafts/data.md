- data/ is the project's data: permanent, not deleted on a restart or a migration
- data/ is the place where the project keeps its data
- every project follows this, so it moves into a docker image easily
- to keep the data, mounting data/ is enough: as a volume or an external directory


# data/

`data/` is where the project keeps its data. The data is permanent: a restart,
a redeploy or a migration to another host does not delete it.

Everything the program writes and has to keep lives under `data/`, and
nowhere else. The rest of the checkout can be thrown away and rebuilt from the
repository; `data/` cannot.

## Docker

Because every project keeps its state in one place, it moves into a docker
image without changes. The image carries the code; the data stays outside it,
and one mount is all it takes to keep it:

```bash
docker run -v app-data:/app/data app          # a named volume
docker run -v /srv/app/data:/app/data app     # a host directory
```

Moving the project to another host is moving its `data/`.
