import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './styles.css';

const helpTextClasses = classNames('form-text', styles.center, styles.muted);
const buttonClasses = classNames('btn', styles.button);
const textClasses = classNames('form-control', styles.text);

const getLabelText = state => state === 'fetching'
  ? <span>🤔&nbsp;&nbsp;&nbsp;Give a sec...</span>
  : <span>🎮&nbsp;&nbsp;&nbsp;Search games</span>;

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
            👾&nbsp;&nbsp;&nbsp;Whos playing?
          </label>

          <input type="text" className={textClasses} id="nicknames"
                 disabled={this.props.uiState === 'fetching'}
                 value={this.state.dudes}
                 onChange={this.change.bind(this)}
                 placeholder="Ex. JakeTheDog, finn_human, bmo"/>

          <small className={ helpTextClasses }>
            Comma separate steam nicknames
          </small>

          <div className={styles.panel}>
            <button type="button" className={ buttonClasses }
                    disabled={this.props.uiState === 'fetching'}
                    onClick={ this.click.bind(this) }>
              { getLabelText(this.props.uiState) }
            </button>
          </div>
        </div>
      </form>
    );
  }
};

export default Form;
