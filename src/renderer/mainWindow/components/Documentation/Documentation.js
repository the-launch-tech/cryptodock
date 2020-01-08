import React from 'react'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'

export default class Documentation extends React.Component {
  constructor(props) {
    super(props)

    this.codeRefs = []

    this.createCodeRef = this.createCodeRef.bind(this)
  }

  componentDidMount() {
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('python', python)
    this.codeRefs.map(hljs.highlightBlock)
  }

  createCodeRef(ref) {
    this.codeRefs.push(ref)
  }

  render() {
    return (
      <div>
        <h5>Python SDK Documentation</h5>
        <pre ref={this.createCodeRef}>
          <code className="javascript">var two = 2</code>
        </pre>
        <pre ref={this.createCodeRef}>
          <code className="python">def main() : return 'test'</code>
        </pre>
      </div>
    )
  }
}
