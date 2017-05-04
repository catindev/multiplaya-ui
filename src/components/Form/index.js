import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import classNames from 'classnames';
import styles from './styles.css';

const helpTextClasses = classNames('form-text', styles.center, styles.muted);
const buttonClasses = classNames('btn', styles.button);
const textClasses = classNames('form-control', styles.text);

const getLabelText = state => state === 'fetch'
  ? <span>🤔&nbsp;&nbsp;Searching...</span>
  : <span>🎮&nbsp;&nbsp;Search games</span>;

function FormButton({ state }) {
  if (state === 'fetch') {
    return (
      <button type="button" className={buttonClasses}
        onClick={this.click.bind(this)}>
        🎮&nbsp;&nbsp;Search games
      </button>
    );
  }
  return <GuestGreeting />;
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { dudes: '' };
  }

  change(e) {
    this.setState({ dudes: e.target.value });
  }

  click(e) {
    this.props.onClick(this.state.dudes);
    e.preventDefault();
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.click.bind(this)}>
        <div className="form-group">
          <label htmlFor="nicknames" className={styles.label}>
            👾&nbsp;&nbsp;Whos playing?
          </label>
          <TextareaAutosize rows={1} className={textClasses}
            placeholder="Ex. JakeTheDog, finn_human, bmo"
            value={this.state.dudes}
            onChange={this.change.bind(this)} />

          <small className={helpTextClasses}>
            List of public Steam profiles: nicknames, IDs or links
          </small>

          <div className={styles.panel}>
            <button type="button" className={buttonClasses}
              onClick={this.click.bind(this)}>
              🎮&nbsp;&nbsp;Search games
              </button>
          </div>
        </div>
      </form>
    );
  }
};

export default Form;
