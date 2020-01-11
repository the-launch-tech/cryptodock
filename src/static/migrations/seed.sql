INSERT INTO settings (
  key_,
  _value
) values (
  "strategy_dir_link",
  "/Users/danielgriffiths/Desktop/projects/cdpy"
);

INSERT INTO backtesters (
  name,
  label,
  description,
  remote_host,
  remote_path,
  remote_entry
)
values (
  "for_loop",
  "For Loop",
  "Basic filter test using forLoop with Python",
  "localhost",
  "/Users/danielgriffiths/Desktop/projects/cryptodock/src/static/backtesters/for_loop",
  "main.py"
);

INSERT INTO backtesters (
  name,
  label,
  description,
  remote_host,
  remote_path,
  remote_entry
)
values (
  "event_driven",
  "Event Driven",
  "Robust Python written event driven backtester with multiple modules to proxy realistic trading. API provided.",
  "localhost",
  "/Users/danielgriffiths/Desktop/projects/cryptodock/src/static/backtesters/event_driven",
  "main.py"
);
