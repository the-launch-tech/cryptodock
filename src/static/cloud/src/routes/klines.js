export default (Api, KlinesController) => {
  /*
   * Get Klines
   * @param pair <[<string>]>
   * @param fields <obj name, label, etc...> [optional]
   * @param start <datetime> [optional]
   * @param end <datetime> [optional]
   * @param granularity <int> [optional]
   * @param limit <int> [optional]
   */
  Api.get(`${process.env.DB_API}/klines`, KlinesController.get)
}
