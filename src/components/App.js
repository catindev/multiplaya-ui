import React, { Component } from 'react';
import axios from 'axios';

import ContentContainer from './ContentContainer';
import Form from './Form';
import asyncComponent from './asyncComponent';

const APIURL = 'https://multiplaya-api.glitch.me/v1';

const socket = io.connect("https://multiplaya-api.glitch.me/");
socket.on('welcome', ({ id }) => console.log('Connected to server as', id));

const Loader = asyncComponent(
  () => System.import('./Loader').then(module => module.default),
  { name: 'Loader' },
);

const Card = asyncComponent(
  () => System.import('./GameCard').then(module => module.default),
  { name: 'Card' },
);

const ProfileError = asyncComponent(
  () => System.import('./ProfileError').then(module => module.default),
  { name: 'ProfileError' },
);

const NotFound = asyncComponent(
  () => System.import('./NotFound').then(module => module.default),
  { name: 'NotFound' },
);

const listStyle = { paddingTop: '2rem' };

const gamesList = list =>
  <div style={listStyle}>
    {list.map(game => <Card key={game.appID} state={game} />)}
  </div>
  ;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ui: 'request', games: false, error: false, queue: 0
    };
  }

  componentDidMount() {
    socket.on('profileError', ({ profile, error }) => {
      this.setState({ ui: 'profileError', error: { profile, message: error } });
    });

    socket.on('queueData', gameData => {
      let queue = this.state.queue;
      queue--;
      const ui = queue === 0 ? 'finish' : 'fetch';
      this.setState({ ui, queue });

      if (gameData !== false) {
        let games = this.state.games !== false
          ? this.state.games.concat(gameData) : [gameData];
        this.setState({ games });
        window.scrollTo(0, document.body.scrollHeight);
      }
    });


    socket.on('response', ({ items }) => {
      console.log('items', items)
      let games = this.state.games !== false
        ? this.state.games.concat(items) : items;
      this.setState({ games });
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('finish', ({ queue }) => {
      if (queue > 0) this.setState({ ui: 'fetch', queue })
      else this.setState({ ui: 'finish', queue });
      console.log('finish with', queue, 'tasks');
    });
  }

  fetchGames(query) {
    const dudes = query
      .split(/,|\s+|\r|\n|\r\n/)
      .filter(p => p !== '');
    this.setState({ ui: 'fetch', games: false });
    socket.emit('fetch', { dudes });
  }

  render() {
    return (
      <ContentContainer>
        <div>
          <Form uiState={this.state.ui} onClick={this.fetchGames.bind(this)} />
          {this.state.games && gamesList(this.state.games)}

          {this.state.ui === 'profileError' &&
            <ProfileError error={this.state.error.message}
              profile={this.state.error.profile} />}

          {this.state.ui === 'fetch' && <Loader />}
        </div>
      </ContentContainer>
    );
  }
}

export default App;
