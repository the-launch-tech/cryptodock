export default (Api, KucoinController, basePath) => {
  const base = `${process.env.DB_API}/${basePath}`
  Api.get(`${base}/klines`, KucoinController.get)
}
