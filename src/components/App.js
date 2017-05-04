import React, { Component } from 'react';
import Progress from 'react-progress';

import ContentContainer from './ContentContainer';
import Form from './Form';
import asyncComponent from './asyncComponent';

const APIURL = 'https://multiplaya-api.glitch.me/';

const socket = io.connect(APIURL);

const Card = asyncComponent(
  () => System.import('./GameCard').then(module => module.default),
  { name: 'Card' },
);

const ProfileError = asyncComponent(
  () => System.import('./ProfileError').then(module => module.default),
  { name: 'ProfileError' },
);

const Error = asyncComponent(
  () => System.import('./Error').then(module => module.default),
  { name: 'Error' },
);

const listStyle = { paddingTop: '2rem' };

const gamesList = list =>
  <div style={listStyle}>
    {list.map(game => <Card key={game.appID} state={game} />)}
  </div>
  ;

let queueCounter = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ui: 'request', games: false, error: false,
      queue: 0, progress: 0, connection: '...'
    };
  }

  componentDidMount() {
    setTimeout(() => {
      !socket.connected && this.setState({ connection: false });
    }, 1000);

    socket.on('connect', () => {
      this.setState({ connection: true });
    });

    socket.on('disconnect', () => {
      this.setState({ connection: false });
    });

    socket.on('welcome', ({ id }) => {
      console.log('Connected to server as', id);
    });

    socket.on('ooops', (error) => {
      this.setState({ error, progress: 100 });
      console.log(error.message || error);
    });

    socket.on('queue', ({ game }) => {
      let queue = this.state.queue; queue += 1;
      let progress = Math.round(queue / this.state.totalQueue * 100);
      progress <= 5 && (progress = 5);
      this.setState({ queue, progress });

      game !== false && this.setState({
        games: this.state.games !== false
          ? this.state.games.concat(game)
          : [game]
      });
    });

    socket.on('response', data => {
      console.info(':D response data', data);
      if (data) {
        const { games, queue } = data;
        this.setState({ games, queue: 0, totalQueue: queue });
        queue === 0 && this.setState({ ui: 'finish', progress: 100 });
      } else {
        this.setState({ ui: 'finish', progress: 100 });
      }
    });
  }

  fetchGames(query) {
    queueCounter = 0;
    this.setState({ error: false, games: false });
    const profiles = query
      .split(/,|\s+|\r|\n|\r\n/)
      .filter(p => p !== '');
    if (profiles.length > 0) {
      this.setState({ ui: 'fetch', games: false, progress: 5 });
      socket.emit('fetch', { profiles });
    } else {
      this.setState({ error: 'I can\'t find games without list of Steam profiles. Type them there 👆' });
    }
  }

  render() {
    return (
      <ContentContainer connection={this.state.connection}>
        <div>
          <Progress percent={this.state.progress} color="#FCF3AF" height="6" />
          <Form uiState={this.state.ui} onClick={this.fetchGames.bind(this)} />
          {this.state.error && <Error>{this.state.error}</Error>}
          {this.state.games && gamesList(this.state.games)}
        </div>
      </ContentContainer>
    );
  }
}

export default App;
