import React from 'react';

export default function Home() {
  return (
    <div className="main-flex-container" >
      <div className="side-lite left-pane" />
      <div className="main" >
        <h1 id="welcome">Welcome to ARaceAthlete</h1>
        <p>ARaceAthlete is a place so share and track events, primarily your <strong>A Race</strong> for the year. What is an <strong>A Race</strong> you ask? While you may have other important events, an    <strong>A Race</strong> is that event you plan all year for. It is the pinnacle of your season. The point of hours of preparation and training.</p>
        <p>What you see here today is just the tip of the iceberg for what is planned for this site (and future phone apps). Check back often for new events and features.</p>
        <blockquote>
          <p>Notice: Anyone can view the events. However, the app is in private beta for user access to Add, Edit and Bookmark events. To join the private beta, please request access to the <a href="https://www.strava.com/clubs/araceathlete">ARaceAthlete</a> Strava Club. </p>
        </blockquote>
        <hr />
        <p>As with any Strava app, if you would like to revoke access to ARaceAthlete, visit <a href="https://www.strava.com/settings/apps">www.strava.com/settings/apps</a>, find A Race Athlete and click the Revoke Access button.</p>
      </div>
      <div className="side-lite right-pane" />
    </div>
  );
}
