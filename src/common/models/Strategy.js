import Model from './Model'
import moment from 'moment'

const { log, error } = console

class Strategy extends Model {
  constructor() {
    super()
  }

  static async getAll() {
    return await super.getAll('strategies')
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('strategies', args)
  }

  static async getOneByFieldValue(args) {
    return await super.getOneByFieldValue('strategies', args)
  }

  static async updateOneFieldValue(args) {
    return await super.updateOneFieldValue('strategies', args)
  }

  static async delete(args) {
    return await super.delete('strategies', args)
  }

  static async save(args) {
    return await super.save('strategies', args)
  }

  static async update(args) {
    return await super.update('strategies', args)
  }

  static getRecent({ after, id, backtest }) {
    let args = []
    let query =
      'SELECT s.label AS strategy_label, n.start_time AS s__start_time, n.end_time AS s__end_time, n.granularity AS s__granularity, e.message AS e__message, e.cycles AS e__cycles, e.current_duration AS e__current_duration, e.start_funds AS e__start_funds, e.current_funds AS e__current_funds, e.change_percentage AS e__change_percentage, e.change_usd AS e__change_usd, e.avg_time_between_orders AS e__avg_time_between_orders, e.avg_order_size AS e__avg_order_size, e.avg_fill_size AS e__avg_fill_size, e.signal_count AS e__signal_count, e.order_count AS e__order_count, e.cancel_count AS e__cancel_count, e.fill_count AS e__fill_count, e.buy_percentage AS e__buy_percentage, e.sell_percentage AS e__sell_percentage, e.market_type_percentage AS e__market_type_percentage, e.limit_type_percentage AS e__limit_type_percentage, e.avg_fee AS e__avg_fee, l.pair AS s__pair, l.exchange AS s__exchange, l.time AS s__time, l.direction AS s__direction, l.weight AS s__weight, o.pair AS o__pair, o.base AS o__base, o.quote AS o__quote, o.exchange AS o__exchange, o.quote_exchange AS o__quote_exchange, o.base_size AS o__base_size, o.side AS o__side, o.type AS o__type, o.stp AS o__stp, o.stop AS o__stop, o.stop_price AS o__stop_price, o.quote_size AS o__quote_size, o.post_only__limit AS o__post_only__limit, o.time_in_force__limit AS o__time_in_force__limit, o.cancel_after__limit AS o__cancel_after__limit, o.is_pending AS o__is_pending, o.is_cancelled AS o__is_cancelled, o.is_filled AS o__is_filled, o.client_oid AS o__client_oid, o.exchange_oid AS o__exchange_oid, f.pair AS f__pair, f.exchange AS f__exchange, f.price AS f__price, f.size AS f__size, f.liquidity AS f__liquidity, f.fee AS f__fee, f.settled AS f__settled, f.side AS f__side, f.filled_at AS f__filled_at, f.exchange_oid AS f__exchange_oid, f.exchange_tid AS f__exchange_tid FROM events AS e RIGHT JOIN strategies AS s ON s.id = e.strategy_id RIGHT JOIN sessions AS n ON n.id=e.session_id LEFT JOIN orders AS o ON e.id=o.event_id LEFT JOIN fills AS f ON e.id=f.event_id LEFT JOIN signals AS l ON e.id=l.event_id WHERE e.created>?'

    args.push(
      moment()
        .subtract(after, 'seconds')
        .format('YYYY-MM-DD HH:mm:ss.SSS')
    )

    query += ' AND n.backtest=? '
    args.push(backtest ? true : false)

    if (id) {
      query += ' AND s.id=? '
      args.push(id)
    }

    query += ' ORDER BY e.created DESC '

    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(query, args, (err, data) => {
        log(err, data)
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

export default Strategy
