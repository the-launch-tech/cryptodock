export default (Api, OrderBooksController) => {
  /*
   * Get Orderbooks
   * @param pair <[<string>]>
   * @param fields <obj name, label, etc...> [optional]
   * @param start <datetime> [optional]
   * @param end <datetime> [optional]
   * @param limit <int> [optional]
   */
  Api.get(`${process.env.DB_API}/orderbooks`, OrderBooksController.get)
}
