import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/mbo.css";
import "codemirror/theme/ttcn.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/eclipse.css";
import "antd/lib/layout/style/css";
import "antd/lib/row/style/css";
import "antd/lib/col/style/css";
import "antd/lib/tag/style/css";
import "antd/lib/button/style/css";
import "antd/lib/card/style/css";
import "antd/lib/icon/style/css";

import { Button, Card, Col, Icon, Layout, Row, Tag } from "antd";
import React, { Component } from "react";

import { UnControlled as CodeMirror } from "react-codemirror2";
import Form from "../src";
import { render } from "react-dom";
import { samples } from "./samples";
import { shouldRender } from "../src/utils";

// Import a few CodeMirror themes; these are used to match alternative
// bootstrap ones.

const { Content } = Layout;

const log = type => console.log.bind(console, type);
const fromJson = json => JSON.parse(json);
const toJson = val => JSON.stringify(val, null, 2);
const liveValidateSchema = { type: "boolean", title: "Live validation" };
const cmOptions = {
  theme: "default",
  height: "auto",
  viewportMargin: Infinity,
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2,
  },
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: false,
  tabSize: 2,
};
const themes = {
  default: {
    stylesheet:
      "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
  },
  cerulean: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/cerulean/bootstrap.min.css",
  },
  cosmo: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/cosmo/bootstrap.min.css",
  },
  cyborg: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/cyborg/bootstrap.min.css",
    editor: "blackboard",
  },
  darkly: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/darkly/bootstrap.min.css",
    editor: "mbo",
  },
  flatly: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/flatly/bootstrap.min.css",
    editor: "ttcn",
  },
  journal: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/journal/bootstrap.min.css",
  },
  lumen: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/lumen/bootstrap.min.css",
  },
  paper: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/paper/bootstrap.min.css",
  },
  readable: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/readable/bootstrap.min.css",
  },
  sandstone: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/sandstone/bootstrap.min.css",
    editor: "solarized",
  },
  simplex: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/simplex/bootstrap.min.css",
    editor: "ttcn",
  },
  slate: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/slate/bootstrap.min.css",
    editor: "monokai",
  },
  spacelab: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/spacelab/bootstrap.min.css",
  },
  "solarized-dark": {
    stylesheet:
      "//cdn.rawgit.com/aalpern/bootstrap-solarized/master/bootstrap-solarized-dark.css",
    editor: "dracula",
  },
  "solarized-light": {
    stylesheet:
      "//cdn.rawgit.com/aalpern/bootstrap-solarized/master/bootstrap-solarized-light.css",
    editor: "solarized",
  },
  superhero: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/superhero/bootstrap.min.css",
    editor: "dracula",
  },
  united: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/united/bootstrap.min.css",
  },
  yeti: {
    stylesheet:
      "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/yeti/bootstrap.min.css",
    editor: "eclipse",
  },
};

class GeoPosition extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.formData };
  }

  onChange(name) {
    return event => {
      this.setState({ [name]: parseFloat(event.target.value) });
      setImmediate(() => this.props.onChange(this.state));
    };
  }

  render() {
    const { lat, lon } = this.state;
    return (
      <div className="geo">
        <h3>Hey, I'm a custom component</h3>
        <p>
          I'm registered as <code>geo</code> and referenced in
          <code>uiSchema</code> as the <code>ui:field</code> to use for this
          schema.
        </p>
        <div className="row">
          <div className="col-sm-6">
            <label>Latitude</label>
            <input
              className="form-control"
              type="number"
              value={lat}
              step="0.00001"
              onChange={this.onChange("lat")}
            />
          </div>
          <div className="col-sm-6">
            <label>Longitude</label>
            <input
              className="form-control"
              type="number"
              value={lon}
              step="0.00001"
              onChange={this.onChange("lon")}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: true, code: props.code };
  }

  componentWillReceiveProps(props) {
    this.setState({ valid: true, code: props.code });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onCodeChange = (editor, metadata, code) => {
    this.setState({ valid: true, code });
    setImmediate(() => {
      try {
        this.props.onChange(fromJson(this.state.code));
      } catch (err) {
        this.setState({ valid: false, code });
      }
    });
  };

  render() {
    const { theme, title } = this.props;
    return (
      <Card
        title={title}
        style={{ border: "1px solid grey", boxShadow: "4px 4px 3px #888888" }}
        bodyStyle={{ padding: "1px 0 0 0" }}>
        <CodeMirror
          value={this.state.code}
          onChange={this.onCodeChange}
          autoCursor={false}
          options={Object.assign({}, cmOptions, { theme })}
        />
      </Card>
    );
  }
}

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = { current: "Simple" };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onLabelChange = label => {
    return event => {
      this.setState({ current: label });
      setImmediate(() => this.props.onSelected(samples[label]));
    };
  };

  render() {
    return (
      <div>
        {Object.keys(samples).map((label, i) => {
          return (
            <Tag.CheckableTag
              key={i}
              checked={this.state.current === label}
              onChange={this.onLabelChange(label)}>
              {label}
            </Tag.CheckableTag>
          );
        })}
      </div>
    );
  }
}

function ThemeSelector({ theme, select }) {
  const themeSchema = {
    type: "string",
    enum: Object.keys(themes),
  };
  return (
    <Form
      schema={themeSchema}
      formData={theme}
      onChange={({ formData }) => select(formData, themes[formData])}>
      <div />
    </Form>
  );
}

class CopyLink extends Component {
  onCopyClick = event => {
    this.input.select();
    document.execCommand("copy");
  };

  render() {
    const { shareURL, onShare } = this.props;
    if (!shareURL) {
      return <Button onClick={onShare}>Share</Button>;
    }
    return (
      <div className="input-group">
        <input
          type="text"
          ref={input => (this.input = input)}
          className="form-control"
          defaultValue={shareURL}
        />
        <span className="input-group-btn">
          <Button onClick={this.onCopyClick}>
            <Icon type="copy" />
          </Button>
        </span>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    // initialize state with Simple data sample
    const { schema, uiSchema, formData, validate } = samples.Simple;
    this.state = {
      form: false,
      schema,
      uiSchema,
      formData,
      validate,
      editor: "default",
      theme: "default",
      liveValidate: true,
      shareURL: null,
    };
  }

  componentDidMount() {
    const hash = document.location.hash.match(/#(.*)/);
    if (hash && typeof hash[1] === "string" && hash[1].length > 0) {
      try {
        this.load(JSON.parse(atob(hash[1])));
      } catch (err) {
        alert("Unable to load form setup data.");
      }
    } else {
      this.load(samples.Simple);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  load = data => {
    // Reset the ArrayFieldTemplate whenever you load new data
    const { ArrayFieldTemplate, ObjectFieldTemplate } = data;
    // force resetting form component instance
    this.setState({ form: false }, _ =>
      this.setState({
        ...data,
        form: true,
        ArrayFieldTemplate,
        ObjectFieldTemplate,
      })
    );
  };

  onSchemaEdited = schema => this.setState({ schema, shareURL: null });

  onUISchemaEdited = uiSchema => this.setState({ uiSchema, shareURL: null });

  onFormDataEdited = formData => this.setState({ formData, shareURL: null });

  onThemeSelected = (theme, { stylesheet, editor }) => {
    this.setState({ theme, editor: editor ? editor : "default" });
    setImmediate(() => {
      // Side effect!
      document.getElementById("theme").setAttribute("href", stylesheet);
    });
  };

  setLiveValidate = ({ formData }) => this.setState({ liveValidate: formData });

  onFormDataChange = ({ formData }) =>
    this.setState({ formData, shareURL: null });

  onShare = () => {
    const { formData, schema, uiSchema } = this.state;
    const {
      location: { origin, pathname },
    } = document;
    try {
      const hash = btoa(JSON.stringify({ formData, schema, uiSchema }));
      this.setState({ shareURL: `${origin}${pathname}#${hash}` });
    } catch (err) {
      this.setState({ shareURL: null });
    }
  };

  render() {
    const {
      schema,
      uiSchema,
      formData,
      liveValidate,
      validate,
      theme,
      editor,
      ArrayFieldTemplate,
      ObjectFieldTemplate,
      transformErrors,
    } = this.state;

    return (
      <Layout>
        <Content>
          <Row style={{ margin: "10px" }}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <h1>react-jsonschema-form</h1>
                </Col>
              </Row>
              <Row
                style={{
                  borderBottom: "1px solid red",
                  paddingBottom: "10px",
                }}>
                <Col span={16}>
                  <Selector onSelected={this.load} />
                </Col>
                <Col span={4}>
                  <Form
                    schema={liveValidateSchema}
                    formData={liveValidate}
                    onChange={this.setLiveValidate}>
                    <div />
                  </Form>
                </Col>
                <Col span={4}>
                  <ThemeSelector theme={theme} select={this.onThemeSelected} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={10} style={{ margin: "10px" }}>
            <Col span={14}>
              <Row>
                <Col span={24} style={{ marginBottom: "10px" }}>
                  <Editor
                    title="JSONSchema"
                    theme={editor}
                    code={toJson(schema)}
                    onChange={this.onSchemaEdited}
                  />
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <Editor
                    title="JSONUiSchema"
                    theme={editor}
                    code={toJson(uiSchema)}
                    onChange={this.onUISchemaEdited}
                  />
                </Col>
                <Col span={12}>
                  <Editor
                    title="formData"
                    theme={editor}
                    code={toJson(formData)}
                    onChange={this.onFormDataEdited}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              {this.state.form && (
                <Card
                  style={{
                    boxShadow: "6px 6px 3px #888888",
                    border: "1px solid grey",
                  }}>
                  <Form
                    ArrayFieldTemplate={ArrayFieldTemplate}
                    ObjectFieldTemplate={ObjectFieldTemplate}
                    liveValidate={liveValidate}
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formData}
                    onChange={this.onFormDataChange}
                    onSubmit={({ formData }) =>
                      console.log("submitted formData", formData)
                    }
                    fields={{ geo: GeoPosition }}
                    validate={validate}
                    onBlur={(id, value) =>
                      console.log(`Touched ${id} with value ${value}`)
                    }
                    onFocus={(id, value) =>
                      console.log(`Focused ${id} with value ${value}`)
                    }
                    transformErrors={transformErrors}
                    onError={log("errors")}>
                    <div>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                      <CopyLink
                        shareURL={this.state.shareURL}
                        onShare={this.onShare}
                      />
                    </div>
                  </Form>
                </Card>
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

render(<App />, document.getElementById("app"));
