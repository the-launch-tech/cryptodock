import React from 'react'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'

export default class Documentation extends React.Component {
  render() {
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('python', python)
    hljs.initHighlightingOnLoad()

    return (
      <div>
        <h5>Python SDK Documentation</h5>
        <pre>
          <code className="javascript">var two = 2</code>
          <code className="python">def main() : return 'test'</code>
        </pre>
      </div>
    )
  }
}
