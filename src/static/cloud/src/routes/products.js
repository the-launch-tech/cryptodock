export default (Api, ProductsController) => {
  /*
   * Get Products
   * @param pair <[<string>]> [optional]
   * @param fields <obj pair, base, quote, etc...> [optional]
   */
  Api.get(`${process.env.DB_API}/products`, ProductsController.get)
}
