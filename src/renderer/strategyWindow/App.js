import React from 'react'

class App extends React.Component {
  render() {
    return (
      <main className="h-screen w-screen flex flex-wrap justify-start items-start bg-black-850">
        <header className="w-1/4 h-full bg-gray-3-400 pt-10 pb-0">
          <h2>Strategy Window</h2>
        </header>
        <article className="w-3/4 h-full p-5 overflow-y-scroll">
          <p>This is a strategy window</p>
        </article>
      </main>
    )
  }
}

export default App
