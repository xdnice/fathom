'use strict'

import { h, render, Component } from 'preact';
import LogoutButton from '../components/LogoutButton.js';
import Realtime from '../components/Realtime.js';
import DatePicker from '../components/DatePicker.js';
import CountWidget from '../components/CountWidget.js';
import Table from '../components/Table.js';

import { bind } from 'decko';

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      period: (window.location.hash.substring(2) || 'week'),
    }
  }

  @bind
  changePeriod(p) {
    this.setState({ period: p })
    window.history.replaceState(this.state, null, `#!${p}`)
  }

  render(props, state) {
    return (
    <div class="rapper">

      <header class="section">
        <nav class="main-nav animated fadeInDown">
            <ul>
              <li class="logo"><a href="/">Fathom</a></li>
              <li class="visitors"><Realtime /></li>
              <li class="spacer">&middot;</li>
              <li class="signout"><LogoutButton onSuccess={this.props.onLogout} /></li>
          </ul>
        </nav>
      </header>

      <section class="section animated fadeInUp delayed_02s">
        <nav class="date-nav">
          <DatePicker onChange={this.changePeriod} value={state.period} />
        </nav>

        <div class="boxes">
          <div class="box box-totals animated fadeInUp delayed_03s">
            <CountWidget title="Unique visitors" endpoint="visitors" period={state.period} />
            <CountWidget title="Page views" endpoint="pageviews" period={state.period} />
            <CountWidget title="Avg time on site" endpoint="time-on-site" format="time" period={state.period} />
            <CountWidget title="Bounce rate" endpoint="bounce-rate" format="percentage" period={state.period} />
          </div>
  
          <Table endpoint="pageviews" headers={["Top pages", "Views", "Uniques"]} period={state.period} />
          <Table endpoint="referrers" headers={["Top referrers", "Views", "Uniques"]} period={state.period} />

        </div>
      </section>

      <footer class="section"></footer>
    </div>
  )}
}

export default Dashboard
