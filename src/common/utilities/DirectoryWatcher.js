import chokidar from 'chokidar'

export default function() {
  const watcher = chokidar.watch('file, dir, glob, or array', {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  })
}
