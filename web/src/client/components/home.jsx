import React from 'react';
import { LevelUp } from 'react-icons/lib/fa/level-up';

export default function Home() {
  return (
    <div>
      <div className="home-jumbotron">
      </div>
      <div className="main-flex-container" >
        <div className="side-lite left-pane" />
        <div className="main" >
          <div>
            {/* {React.createElement(LevelUp, null)} */}
            <h1 className="welcome"><span className="wrap-here">Welcome to</span>{' '}<span className="wrap-here">A Race Athlete</span><div className="sub-header">It{"'"}s time to level up</div></h1>
          </div>
          <p>ARaceAthlete is a place so share and track events, primarily your <strong>A Race</strong> for the year. What is an <strong>A Race</strong> you ask? While you may have other important events, an <strong>A Race</strong> is that event you plan all year for. It is the pinnacle of your season. The point of hours of preparation and training.</p>
          <p>What you see here today is just the tip of the iceberg for what is planned for this site (and future phone apps). Check back often for new events and features.</p>
          <blockquote>
            <p>Notice: Anyone can view the events. However, the app is in private beta for user access to Add, Edit and Bookmark events. To join the private beta, please request access to the <a href="https://www.strava.com/clubs/araceathlete">ARaceAthlete</a> Strava Club. </p>
          </blockquote>
          <hr />
        </div>
        <div className="side-lite right-pane" />
      </div>
    </div>

  );
}
