import React from 'react'

export default ({ recentActivity }) => {
  return (
    <div>
      {recentActivity.map(
        (
          {
            strategy_label,
            strategy_id,
            session_start_time,
            session_end_time,
            session_start_funds,
            session_end_funds,
            session_granularity,
            live_session_id,
            live_event_message,
          },
          i
        ) => {
          return (
            <div key={i}>
              <div>
                <label>
                  {strategy_label} <small>({strategy_id})</small>
                </label>
                <pre>{live_event_message}</pre>
              </div>
              <ul>
                <li>
                  {session_start_time} {session_end_time}
                </li>
                <li>
                  {session_start_funds} {session_end_funds}
                </li>
                <li>{session_granularity}</li>
              </ul>
            </div>
          )
        }
      )}
    </div>
  )
}
