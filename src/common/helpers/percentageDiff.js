export default (start, end) => {
  start = start ? parseFloat(start) : 0
  end = end ? parseFloat(end) : 0
  return 100 * Math.abs((start - end) / ((start + end) / 2))
}
