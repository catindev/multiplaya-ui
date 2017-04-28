import React, { Component } from 'react';
import axios from 'axios';

import ContentContainer from './ContentContainer';
import Form from './Form';
import asyncComponent from './asyncComponent';

const APIURL = 'https://multiplaya-api.glitch.me/v1';

const Loader = asyncComponent(
  () => System.import('./Loader').then(module => module.default),
  { name: 'Loader' },
);

const Card = asyncComponent(
    () => System.import('./GameCard').then(module => module.default),
    { name: 'Card' },
);

const listStyle = { paddingTop: '2rem' };

const gamesList = list =>
    <div style={listStyle}>
      { list.map( game => <Card key={game.appID} state={game} />) }
    </div>
;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ui: 'request', games: [], lastQuery: false };
  }

  fetchGames(query){
    if (!query) return;
    const dudes = query.replace(/\s/g, '');
    if (dudes.indexOf(',') === -1 || this.state.lastQuery === query) return;
    this.setState({ ui: 'fetching', games: [], lastQuery: query });
    const response = ({ data }) => this.setState({
      ui: 'request', games: data
    });
    axios.get(`${APIURL}/?dudes=${query}`).then( response );
  }

  render() {
    return (
        <ContentContainer>
          <div>
            <Form uiState={this.state.ui} onClick={this.fetchGames.bind(this)}/>
            { this.state.ui === 'fetching' && <Loader /> }
            { this.state.games.length > 0 && gamesList(this.state.games) }
          </div>
        </ContentContainer>
    );
  }
}

export default App;