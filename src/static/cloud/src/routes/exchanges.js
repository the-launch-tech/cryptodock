export default (Api, ExchangesController) => {
  /*
   * Get Exchanges
   * @query name <[<string>]> [optional]
   * @query id <[<string>]> [optional]
   * @param fields <obj name, label, etc...> [optional]
   */
  Api.get(`${process.env.DB_API}/exchanges/:name?/:id?`, ExchangesController.get)
}
