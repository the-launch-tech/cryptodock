export default (Api, TradesController) => {
  /*
   * Get Trades
   * @query pair <[<string>]>
   * @param fields <obj name, label, etc...> [optional]
   * @param start <datetime> [optional]
   * @param end <datetime> [optional]
   * @param granularity <int> [optional]
   * @param limit <int> [optional]
   */
  Api.get(`${process.env.DB_API}/trades`, TradesController.get)
}
